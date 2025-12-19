import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// TEMP storage (important)
const orders = [];
const inquiries = [];

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", service: "Edible Farms API" });
});

// CUSTOMER ROUTES
app.post("/api/order", (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  console.log("New Order:", order);
  res.json({ success: true });
});

app.post("/api/inquiry", (req, res) => {
  const inquiry = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  inquiries.push(inquiry);
  console.log("New Inquiry:", inquiry);
  res.json({ success: true });
});

// 🔐 ADMIN ROUTES
app.get("/api/admin/orders", (req, res) => {
  res.json(orders);
});

app.get("/api/admin/inquiries", (req, res) => {
  res.json(inquiries);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log("API running on port", PORT)
);
