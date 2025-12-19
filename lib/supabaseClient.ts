import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Supabase client'ı sadece geçerli URL varsa oluştur
export const supabase = (supabaseUrl && supabaseUrl !== 'your_supabase_url_here' && supabaseUrl.startsWith('http'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Örnek veri çekme fonksiyonu
export async function fetchServices() {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching services:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Supabase connection error:', error)
    return []
  }
}

export async function fetchOrders(userId?: string) {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array')
    return []
  }

  try {
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    // Eğer userId varsa filtrele (müşteri dashboard'ı için)
    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching orders:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Supabase connection error:', error)
    return []
  }
}

// Admin için tüm siparişleri çek
export async function fetchAllOrders() {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all orders:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Supabase connection error:', error)
    return []
  }
}

// Sipariş durumunu güncelle
export async function updateOrderStatus(orderId: string, status: string) {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      console.error('Error updating order status:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Supabase update error:', error)
    throw error
  }
}