import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.oduroe010@gmail.com,
    pass: process.env.#Arrangements123
  }
});

// TEMP STORAGE (in-memory)
const orders = [];
const inquiries = [];

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", service: "Edible Farms API" });
});

/* =====================
   CUSTOMER ENDPOINTS
===================== */

// Receive order
app.post("/api/order", async (req, res) => {
  const { name, phone, type, qty, address } = req.body;

  try {
    await transporter.sendMail({
      from: `"Edible Farms" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🛒 New Order Received",
      html: `
        <h2>New Order</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Quantity:</strong> ${qty}</p>
        <p><strong>Address:</strong> ${address}</p>
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// Receive Inquiry
app.post("/api/inquiry", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Edible Farms" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 New Inquiry",
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
/* =====================
   ADMIN ENDPOINTS
===================== */

// Get all orders (admin)
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Get all inquiries (admin)
app.get("/api/inquiries", (req, res) => {
  res.json(inquiries);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
