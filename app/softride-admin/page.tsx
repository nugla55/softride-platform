'use client'

import { useEffect, useState } from 'react'
import { fetchAllOrders, updateOrderStatus } from '../../lib/supabaseClient'
import { Package, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

interface Order {
  id: string
  customer_name: string
  customer_email: string
  service_id: string
  status: string
  total_price: number
  created_at: string
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const ordersData = await fetchAllOrders()
      setOrders(ordersData)
    } catch (error) {
      console.error('Siparişler yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)
    try {
      await updateOrderStatus(orderId, newStatus)
      // Listeyi güncelle
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    } catch (error) {
      console.error('Durum güncellenirken hata:', error)
      alert('Durum güncellenirken hata oluştu')
    } finally {
      setUpdating(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'in_progress':
        return <Package className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı'
      case 'pending':
        return 'Beklemede'
      case 'in_progress':
        return 'Devam Ediyor'
      case 'cancelled':
        return 'İptal Edildi'
      default:
        return 'Bilinmiyor'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-dark-600 dark:text-dark-300" />
          <p className="text-dark-600 dark:text-dark-300">Siparişler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
            SoftRide Admin Paneli
          </h1>
          <p className="text-dark-600 dark:text-dark-300">
            Siparişleri yönetin ve durumlarını güncelleyin
          </p>
        </div>

        <div className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-sm border border-white/20 dark:border-dark-700/50 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-dark-900 dark:text-white">
              Tüm Siparişler ({orders.length})
            </h2>
            <button
              onClick={loadOrders}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-dark-200 dark:hover:bg-dark-600 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Yenile</span>
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-dark-400 mx-auto mb-4" />
              <p className="text-dark-600 dark:text-dark-300">Henüz hiç sipariş bulunmuyor.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-200 dark:border-dark-700">
                    <th className="text-left py-3 px-4 font-medium text-dark-900 dark:text-white">Müşteri</th>
                    <th className="text-left py-3 px-4 font-medium text-dark-900 dark:text-white">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-dark-900 dark:text-white">Tarih</th>
                    <th className="text-left py-3 px-4 font-medium text-dark-900 dark:text-white">Tutar</th>
                    <th className="text-left py-3 px-4 font-medium text-dark-900 dark:text-white">Durum</th>
                    <th className="text-left py-3 px-4 font-medium text-dark-900 dark:text-white">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-dark-100 dark:border-dark-700/50 hover:bg-dark-50/50 dark:hover:bg-dark-700/20">
                      <td className="py-4 px-4 text-dark-900 dark:text-white font-medium">
                        {order.customer_name}
                      </td>
                      <td className="py-4 px-4 text-dark-600 dark:text-dark-300">
                        {order.customer_email}
                      </td>
                      <td className="py-4 px-4 text-dark-600 dark:text-dark-300">
                        {new Date(order.created_at).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="py-4 px-4 text-dark-900 dark:text-white font-medium">
                        ₺{order.total_price.toLocaleString('tr-TR')}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          {order.status !== 'pending' && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, 'pending')}
                              disabled={updating === order.id}
                              className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors disabled:opacity-50"
                            >
                              {updating === order.id ? '...' : 'Beklemede'}
                            </button>
                          )}
                          {order.status !== 'in_progress' && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, 'in_progress')}
                              disabled={updating === order.id}
                              className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                            >
                              {updating === order.id ? '...' : 'Devam Ediyor'}
                            </button>
                          )}
                          {order.status !== 'completed' && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, 'completed')}
                              disabled={updating === order.id}
                              className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors disabled:opacity-50"
                            >
                              {updating === order.id ? '...' : 'Tamamlandı'}
                            </button>
                          )}
                          {order.status !== 'cancelled' && (
                            <button
                              onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                              disabled={updating === order.id}
                              className="px-3 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                            >
                              {updating === order.id ? '...' : 'İptal'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}