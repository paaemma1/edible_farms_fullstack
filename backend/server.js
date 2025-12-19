import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// ================= EMAIL SETUP =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oduroe010@gmail.com",      // 👈 your gmail
    pass: "#Arrangements123"          // 👈 app password
  }
});

// ================= TEST API =================
app.get("/", (req, res) => {
  res.json({ status: "OK", service: "Edible Farms API" });
});

// ================= ORDER =================
app.post("/api/order", async (req, res) => {
  const { name, phone, type, qty, address } = req.body;

  console.log("New Order:", req.body);

  try {
    await transporter.sendMail({
      from: "Edible Farms <YOUR_EMAIL@gmail.com>",
      to: "YOUR_EMAIL@gmail.com",
      subject: "🐟 New Order – Edible Farms",
      html: `
        <h3>New Order Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Type:</b> ${type}</p>
        <p><b>Quantity:</b> ${qty}</p>
        <p><b>Address:</b> ${address}</p>
      `
    });

    res.json({ success: true, message: "Order received!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// ================= INQUIRY =================
app.post("/api/inquiry", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("New Inquiry:", req.body);

  try {
    await transporter.sendMail({
      from: "Edible Farms <YOUR_EMAIL@gmail.com>",
      to: "YOUR_EMAIL@gmail.com",
      subject: "📩 New Inquiry – Edible Farms",
      html: `
        <h3>New Inquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message}</p>
      `
    });

    res.json({ success: true, message: "Inquiry sent!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// ================= START =================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("API running on port", PORT));
