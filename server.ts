import express from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route to handle registration
  app.post("/api/register", async (req, res) => {
    try {
      console.log("Received registration request:", req.body);
      const { name, phone, email, product } = req.body;

      if (!name || !phone || !email) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng điền đầy đủ thông tin bắt buộc."
        });
      }

      // Generate a unique payment code (BDS + 6 random digits)
      const paymentCode = "BDS" + Math.floor(100000 + Math.random() * 900000);
      
      const registrationData = {
        name,
        phone,
        email,
        product,
        paymentCode,
        status: "UNPAID"
      };

      // Sync with Google Sheets if URL is provided
      const scriptUrl = process.env.GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxPAzwJnA4q1qV0Nf9-p7KzHOcgOIaJ5eNSsZBPQI6tb09dOGZnI4H-EHXYIMD7AfIaUA/exec';
      
      console.log("Syncing with Google Sheets at:", scriptUrl);
      
      // We don't await this to make the response faster, 
      // but we handle errors internally
      axios.post(scriptUrl, registrationData)
        .then(() => console.log("Synced with Google Sheets successfully"))
        .catch((err) => console.error("Failed to sync with Google Sheets:", err.message));

      res.json({
        success: true,
        message: "Đăng ký thành công!",
        data: registrationData
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra trong quá trình đăng ký: " + (error.message || "Unknown error")
      });
    }
  });

  // API route to check payment status
  app.get("/api/check-status/:paymentCode", async (req, res) => {
    try {
      const { paymentCode } = req.params;
      const scriptUrl = process.env.GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxPAzwJnA4q1qV0Nf9-p7KzHOcgOIaJ5eNSsZBPQI6tb09dOGZnI4H-EHXYIMD7AfIaUA/exec';
      
      if (!scriptUrl) {
        return res.json({ status: "UNPAID" });
      }

      // We call the script with a GET parameter to check status
      const response = await axios.get(`${scriptUrl}?paymentCode=${paymentCode}`);
      const status = response.data;

      res.json({ status });
    } catch (error) {
      console.error("Status check error:", error);
      res.status(500).json({ error: "Failed to check status" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
