import "dotenv/config";
import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const port = process.env.PORT || 3001;
const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.TO_EMAIL || "meesumdameer@gmail.com";
const fromEmail = process.env.FROM_EMAIL || "Revive Website <onboarding@resend.dev>";

app.use(cors({ origin: true }));
app.use(express.json({ limit: "10mb" }));

/** POST /api/booking – consultation request */
app.post("/api/booking", async (req, res) => {
  try {
    const { name, email, phone, service, date } = req.body || {};
    if (!name || !email || !phone || !service || !date) {
      return res.status(400).json({ error: "Missing required fields: name, email, phone, service, date" });
    }
    if (!process.env.RESEND_API_KEY) {
      return res.status(503).json({ error: "Email not configured. Set RESEND_API_KEY." });
    }

    const html = `
      <h2>New consultation request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Preferred date:</strong> ${escapeHtml(date)}</p>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[Revive] Consultation request from ${escapeHtml(name)}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email", detail: error.message });
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Booking API error:", e);
    res.status(500).json({ error: "Server error" });
  }
});

/** POST /api/careers – job application (optional CV as base64) */
app.post("/api/careers", async (req, res) => {
  try {
    const { name, email, phone, role, openRoleText, message, cvFilename, cvBase64 } = req.body || {};
    if (!name || !email || !role) {
      return res.status(400).json({ error: "Missing required fields: name, email, role" });
    }
    if (!process.env.RESEND_API_KEY) {
      return res.status(503).json({ error: "Email not configured. Set RESEND_API_KEY." });
    }

    const roleLabel = role === "open" && openRoleText ? openRoleText : role;
    const html = `
      <h2>New job application</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
      <p><strong>Role:</strong> ${escapeHtml(roleLabel)}</p>
      ${message ? `<p><strong>Cover note:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
    `;

    const attachments = [];
    if (cvBase64 && cvFilename) {
      let content = cvBase64;
      if (typeof content === "string" && content.includes("base64,")) {
        content = content.split("base64,")[1] || content;
      }
      attachments.push({ filename: cvFilename || "cv.pdf", content: content });
    }

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[Revive] Job application: ${escapeHtml(name)} – ${escapeHtml(roleLabel)}`,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email", detail: error.message });
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Careers API error:", e);
    res.status(500).json({ error: "Server error" });
  }
});

function escapeHtml(s) {
  if (s == null) return "";
  const str = String(s);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set – email endpoints will return 503.");
  }
});
