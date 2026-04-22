
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ใส่ Webhook ของ Make.com ตรงนี้ (เดี๋ยวค่อยมาแก้ทีหลังได้)
const MAKE_WEBHOOK_URL = "https://hook.make.com/your_secret_webhook_id_here";

app.post('/api/generate-video', async (req, res) => {
    try {
        const payload = req.body;
        const apiKey = req.headers.authorization;

        console.log("📥 ได้รับคำสั่งสร้างวิดีโอจากหน้าเว็บ!");
        
        if (!apiKey || apiKey !== 'Bearer YOUR_SECRET_KEY') {
            return res.status(401).json({ error: "API Key ไม่ถูกต้อง" });
        }

        console.log("🚀 กำลังส่งข้อมูลซ่อนไปให้ Make.com ทำงานเบื้องหลัง...");
        // ส่งข้อมูลไปหา Make.com
        if (MAKE_WEBHOOK_URL.includes('make.com')) {
           await axios.post(MAKE_WEBHOOK_URL, payload);
        }

        res.status(200).json({ 
            success: true,
            message: "ส่งคำสั่งสำเร็จ! ระบบกำลังดำเนินการสร้างและโพสต์" 
        });

    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error.message);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการเชื่อมต่อระบบหลังบ้าน" });
    }
});

// เปิด Server ที่ Port ที่ Render.com กำหนดให้
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 ระบบหลังบ้านทำงานแล้วที่พอร์ต ${PORT}`);
});
