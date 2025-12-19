import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'try', description, customerName, customerEmail, serviceId } = await request.json()

    console.log('Mock Checkout İşlemi Başlatıldı:', { amount, currency, description })

    // 2 saniye beklet (Ödeme yapılıyormuş simülasyonu)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Not: Supabase kaydı src/actions/checkout.ts içinde veya burada yapılabilir.
    // Kullanıcı isteğine göre siparişi Supabase'e kaydetme mantığını buraya da ekleyebiliriz
    // ancak src/actions/checkout.ts zaten bu işi yapıyor gibi görünüyor.
    
    // Eğer bu API endpoint'i bağımsız kullanılıyorsa, simülasyon olarak başarı dönüyoruz.
    return NextResponse.json({ 
      success: true, 
      message: 'Ödeme başarıyla simüle edildi',
      transactionId: 'mock_' + Math.random().toString(36).substr(2, 9)
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Ödeme işlemi simüle edilirken hata oluştu' },
      { status: 500 }
    )
  }
}