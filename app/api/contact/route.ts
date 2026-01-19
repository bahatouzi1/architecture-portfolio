import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    const emailContent = `
Nouveau message de contact depuis le site SAA ARCHI

Nom: ${name}
Email: ${email}
Téléphone: ${phone || "Non fourni"}
Sujet: ${subject}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de contact du site web SAA ARCHI.
    `.trim()

    // Send email using Resend
    await resend.emails.send({
      from: "onboarding@resend.dev", // Resend's default sender for testing
      to: "contact@saa-archi.com.tn",
      subject: `Nouveau message: ${subject}`,
      text: emailContent,
      replyTo: email, // Allow replying directly to the sender
    })

    return NextResponse.json(
      {
        success: true,
        message: "Votre message a été envoyé avec succès. Nous vous contacterons bientôt.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer." },
      { status: 500 },
    )
  }
}
