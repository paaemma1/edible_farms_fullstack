import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// TEMP STORAGE (resets when server restarts)
const orders = [];
const inquiries = [];

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "Edible Farms API"
  });
});

/* ======================
   CUSTOMER ENDPOINTS
====================== */

// Receive order
app.post("/api/order", (req, res) => {
  const order = {
    ...req.body,
    date: new Date().toISOString()
  };

  orders.push(order);
  console.log("New Order:", order);

  res.json({
    success: true,
    message: "Order received"
  });
});

// Receive inquiry
app.post("/api/inquiry", (req, res) => {
  const inquiry = {
    ...req.body,
    date: new Date().toISOString()
  };

  inquiries.push(inquiry);
  console.log("New Inquiry:", inquiry);

  res.json({
    success: true,
    message: "Inquiry received"
  });
});

/* ======================
   ADMIN ENDPOINTS
====================== */

// Fetch all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Fetch all inquiries
app.get("/api/inquiries", (req, res) => {
  res.json(inquiries);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Edible Farms API running on port ${PORT}`);
});
