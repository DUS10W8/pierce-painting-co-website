import * as tls from "node:tls";

/**
 * Minimal SMTP client (implicit TLS, AUTH LOGIN) for sending one message
 * through an existing mailbox such as Zoho Mail. No external packages.
 */

export type MailAttachment = { filename: string; contentType: string; content: Buffer };

export type MailMessage = {
  from: string; // must be the authenticated mailbox for Zoho
  fromName?: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  attachments?: MailAttachment[];
};

export type SmtpConfig = { host: string; port: number; user: string; pass: string; timeoutMs?: number };

function encodeHeader(value: string): string {
  // RFC 2047 encode anything non-ASCII; strip CR/LF to prevent header injection.
  const clean = value.replace(/[\r\n]+/g, " ");
  return /^[\x20-\x7E]*$/.test(clean) ? clean : `=?UTF-8?B?${Buffer.from(clean, "utf8").toString("base64")}?=`;
}

function wrap76(b64: string): string {
  return b64.replace(/.{1,76}/g, "$&\r\n");
}

export function buildMessage(msg: MailMessage): string {
  const boundary = `----blubridge-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  const from = msg.fromName ? `${encodeHeader(msg.fromName)} <${msg.from}>` : msg.from;
  const headers = [
    `From: ${from}`,
    `To: ${msg.to}`,
    ...(msg.replyTo ? [`Reply-To: ${msg.replyTo.replace(/[\r\n<>]+/g, "")}`] : []),
    `Subject: ${encodeHeader(msg.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${Date.now()}.${Math.random().toString(36).slice(2)}@${msg.from.split("@")[1] ?? "localhost"}>`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
  ];
  const parts = [
    `--${boundary}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${wrap76(Buffer.from(msg.text, "utf8").toString("base64"))}`,
    ...(msg.attachments ?? []).map(
      (a) =>
        `--${boundary}\r\nContent-Type: ${a.contentType.replace(/[\r\n";]+/g, "")}; name="${a.filename.replace(/[\r\n"]+/g, "")}"\r\n` +
        `Content-Disposition: attachment; filename="${a.filename.replace(/[\r\n"]+/g, "")}"\r\nContent-Transfer-Encoding: base64\r\n\r\n${wrap76(a.content.toString("base64"))}`
    ),
    `--${boundary}--\r\n`,
  ];
  // Everything is base64 or ASCII headers, so no line can start with "." — no dot-stuffing needed.
  return headers.join("\r\n") + "\r\n\r\n" + parts.join("\r\n");
}

export function sendMail(cfg: SmtpConfig, msg: MailMessage): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host: cfg.host, port: cfg.port, servername: cfg.host });
    socket.setEncoding("utf8");
    const timer = setTimeout(() => fail(new Error("SMTP timeout")), cfg.timeoutMs ?? 15000);
    let buffer = "";
    let waiting: ((code: number, text: string) => void) | null = null;
    let done = false;

    function fail(err: Error) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      socket.destroy();
      reject(err);
    }

    socket.on("error", fail);
    socket.on("data", (chunk: string) => {
      buffer += chunk;
      // A complete reply ends with a line "NNN text" (space, not dash, after the code).
      const lines = buffer.split("\r\n");
      for (let i = 0; i < lines.length - 1; i++) {
        if (/^\d{3} /.test(lines[i])) {
          const reply = lines.slice(0, i + 1).join("\n");
          buffer = lines.slice(i + 1).join("\r\n");
          const cb = waiting;
          waiting = null;
          cb?.(parseInt(lines[i].slice(0, 3), 10), reply);
          return;
        }
      }
    });

    const expect = (ok: number[]) =>
      new Promise<string>((res, rej) => {
        waiting = (code, text) => (ok.includes(code) ? res(text) : rej(new Error(`SMTP ${code}`)));
      });
    const send = (line: string, ok: number[]) => {
      const p = expect(ok);
      socket.write(line + "\r\n");
      return p;
    };

    (async () => {
      await expect([220]);
      await send(`EHLO ${msg.from.split("@")[1] ?? "localhost"}`, [250]);
      await send("AUTH LOGIN", [334]);
      await send(Buffer.from(cfg.user).toString("base64"), [334]);
      await send(Buffer.from(cfg.pass).toString("base64"), [235]);
      await send(`MAIL FROM:<${msg.from}>`, [250]);
      await send(`RCPT TO:<${msg.to}>`, [250, 251]);
      await send("DATA", [354]);
      await send(buildMessage(msg) + "\r\n.", [250]);
      socket.write("QUIT\r\n");
      done = true;
      clearTimeout(timer);
      socket.end();
      resolve();
    })().catch((e) => fail(e instanceof Error ? e : new Error(String(e))));
  });
}
