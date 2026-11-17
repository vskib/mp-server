import { saveMessage } from "../services/messageService.js";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v) => String(v ?? "").replace(/[<>]/g, "").trim();

export async function submitContact(req, res, next) {
  try {
    const b = req.body || {};
    if (b.website) return res.status(200).json({ success: true, message: "Message sent." }); // honeypot: pretend success
    const data = { name: clean(b.name), email: clean(b.email), subject: clean(b.subject), message: clean(b.message) };
    const errors = {};
    if (data.name.length < 2 || data.name.length > 80) errors.name = "Enter your name (2–80 characters).";
    if (!EMAIL.test(data.email) || data.email.length > 120) errors.email = "Enter a valid email address.";
    if (data.subject.length < 3 || data.subject.length > 120) errors.subject = "Enter a subject (3–120 characters).";
    if (data.message.length < 10 || data.message.length > 2000) errors.message = "Message must be 10–2000 characters.";
    if (Object.keys(errors).length) return res.status(400).json({ success: false, message: "Please fix the highlighted fields.", errors });
    await saveMessage({ ...data, ip: req.ip });
    res.status(201).json({ success: true, message: "Message sent. Thank you for reaching out!" });
  } catch (e) { next(e); }
}
