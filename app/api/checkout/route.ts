import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd', description } = await request.json()

    // Stripe checkout session oluştur
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: description || 'SoftRide Service',
            },
            unit_amount: amount, // cent cinsinden (örneğin 1000 = $10.00)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Ödeme işlemi başlatılırken hata oluştu' },
      { status: 500 }
    )
  }
}

// İyzico alternatifi için not: İyzico API'sini entegre etmek için ayrı bir yapılandırma gerekecek
// Bu endpoint'i İyzico için genişletebilirsiniz