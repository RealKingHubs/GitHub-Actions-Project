require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/send", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            });
        }

        const msg = {
            to: "odokingsleyu@gmail.com",
            from: {
                email: "odokingsleyu@gmail.com", // MUST be verified in SendGrid
                name: "Odo Kingsley | Cloud Engineer"
            },
            subject: `New Portfolio Message from ${name}`,
            replyTo: email,
            html: `
                <div style="font-family: Arial, sans-serif; padding:20px;">
                    <h2>New Contact Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>

                    <hr />

                    <p>
                        Best Regards,<br>
                        <strong>RealKingHubs</strong><br>
                        Cloud Engineer
                    </p>
                </div>
            `
        };

        await sgMail.send(msg);

        res.status(200).json({ success: true });

    } catch (error) {
        console.error("SendGrid Error:", error.response?.body || error);
        res.status(500).json({
            success: false,
            error: error.response?.body || error.message
        });
    }
});

app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});