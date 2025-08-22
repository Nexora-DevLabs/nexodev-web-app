import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    console.log("Contact form submission:", { name, email, message });

    // Basic validation
    if (!name || !email || !message) {
      console.log("Validation failed: missing fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Send email using Resend
    const result = await resend.emails.send({
      from: "notifications@nexoradevlabs.com",
      to: "info@nexoradevlabs.com",
      subject: `Contact Form: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">${message}</p>
          </div>
          <p style="color: #666; font-size: 14px;">This message was sent from your website contact form.</p>
        </div>
      `,
    });

    console.log("Resend result:", result);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Resend error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to send email", details: errorMessage },
      { status: 500 },
    );
  }
}
