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
app.post("/api/order", (req, res) => {
  orders.push(req.body);
  console.log("New Order:", req.body);
  res.json({ success: true, message: "Order received!" });
});

// Receive inquiry
app.post("/api/inquiry", (req, res) => {
  inquiries.push(req.body);
  console.log("New Inquiry:", req.body);
  res.json({ success: true, message: "Inquiry submitted!" });
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
