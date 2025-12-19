'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function processPayment(data: {
  customerName: string
  customerEmail: string
  serviceId: string
  serviceName: string
  totalPrice: number
}) {
  try {
    // iyzico API simülasyonu
    console.log('iyzico API çağrısı simülasyonu:', data)

    // 2 saniye beklet (API çağrısı simülasyonu)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Supabase client oluştur
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Supabase bağlantısını test et
    console.log('Supabase bağlantısı test ediliyor...')
    const { data: testData, error: testError } = await supabase
      .from('services')
      .select('id')
      .limit(1)

    if (testError) {
      console.error('Supabase bağlantı hatası:', testError)
      throw new Error('Supabase bağlantısı başarısız')
    }

    console.log('Supabase bağlantısı başarılı')

    // Supabase'e sipariş ekleme
    console.log('Sipariş ekleniyor:', {
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      service_id: data.serviceId,
      status: 'pending',
      total_price: data.totalPrice
    })

    const { data: orderData, error } = await supabase
      .from('orders')
      .insert({
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        service_id: data.serviceId,
        status: 'pending',
        total_price: data.totalPrice
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert hatası:', error)
      console.error('Hata detayları:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      throw new Error(`Sipariş kaydedilemedi: ${error.message}`)
    }

    console.log('Sipariş başarıyla oluşturuldu:', orderData)

    return { success: true, orderId: orderData.id }
  } catch (error) {
    console.error('Payment processing error:', error)
    throw error
  }
}