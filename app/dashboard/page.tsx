'use client'

import { useEffect, useState } from 'react'
import { fetchServices } from '../../lib/supabaseClient'
import { Package, Briefcase } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  price: number
  image_url: string
}

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Şimdilik sadece services'i çek - orders için authentication gerekli
        const servicesData = await fetchServices()
        setServices(servicesData)
      } catch (error) {
        console.error('Veri yükleme hatası:', error)
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
            Müşteri Paneli
          </h1>
          <p className="text-dark-600 dark:text-dark-300">
            Taleplerinizi ve siparişlerinizi buradan takip edebilirsiniz.
          </p>
        </div>

        {/* Orders Section - Geçici olarak devre dışı */}
        <div className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-sm border border-white/20 dark:border-dark-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-dark-900 dark:text-white mb-6">
            Siparişlerim
          </h2>

          <div className="text-center py-8">
            <Package className="h-12 w-12 text-dark-400 mx-auto mb-4" />
            <p className="text-dark-600 dark:text-dark-300 mb-2">
              Sipariş sistemi yakında aktif olacak.
            </p>
            <p className="text-sm text-dark-500 dark:text-dark-400">
              Kullanıcı giriş sistemi entegre edildikten sonra siparişlerinizi görebileceksiniz.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white/70 dark:bg-dark-800/70 backdrop-blur-sm border border-white/20 dark:border-dark-700/50 rounded-2xl p-6 mt-8">
          <h2 className="text-xl font-semibold text-dark-900 dark:text-white mb-6 flex items-center">
            <Briefcase className="h-6 w-6 mr-2 text-primary-600" />
            Mevcut Hizmetler
          </h2>

          {services.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 text-dark-400 mx-auto mb-4" />
              <p className="text-dark-600 dark:text-dark-300">Henüz hiç hizmet bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-dark-50 dark:bg-dark-700/50 rounded-lg p-4 border border-white/10 dark:border-dark-600/50 hover:shadow-lg transition-all duration-300"
                >
                  {service.image_url && (
                    <img
                      src={service.image_url}
                      alt={service.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="font-semibold text-dark-900 dark:text-white mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-dark-600 dark:text-dark-300 mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ₺{service.price.toLocaleString('tr-TR')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}