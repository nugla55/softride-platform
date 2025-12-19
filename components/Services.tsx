'use client'

import { useEffect, useState } from 'react'
import { fetchServices } from '../lib/supabaseClient'
import { Code, Database, Shield, Zap, Smartphone, Cloud, Loader2 } from 'lucide-react'
import CheckoutButton from './CheckoutButton'

interface Service {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
}

const iconMap: Record<string, any> = {
  'Web Tasarım': Code,
  'Veritabanı Yönetimi': Database,
  'Güvenlik Çözümleri': Shield,
  'Performans Optimizasyonu': Zap,
  'Mobil Uygulamalar': Smartphone,
  'Bulut Çözümleri': Cloud,
  'E-Ticaret Çözümleri': Cloud,
  'API Geliştirme': Code,
}

const colorMap: Record<string, string> = {
  'Web Tasarım': 'text-neon-cyan',
  'Veritabanı Yönetimi': 'text-neon-green',
  'Güvenlik Çözümleri': 'text-neon-blue',
  'Performans Optimizasyonu': 'text-neon-yellow',
  'Mobil Uygulamalar': 'text-neon-pink',
  'Bulut Çözümleri': 'text-primary-400',
  'E-Ticaret Çözümleri': 'text-neon-cyan',
  'API Geliştirme': 'text-neon-green',
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices()
        setServices(data)
      } catch (error) {
        console.error('Hizmetler yüklenirken hata:', error)
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  if (loading) {
    return (
      <section id="services" className="py-20 bg-dark-50 dark:bg-dark-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              SoftRide olarak, işletmenizin ihtiyaçlarına özel yazılım çözümleri sunuyoruz.
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            <span className="ml-2 text-dark-600 dark:text-dark-300">Hizmetler yükleniyor...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 bg-dark-50 dark:bg-dark-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
            SoftRide olarak, işletmenizin ihtiyaçlarına özel yazılım çözümleri sunuyoruz.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-dark-600 dark:text-dark-300">Henüz hizmet bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.name] || Code
              const colorClass = colorMap[service.name] || 'text-primary-400'

              return (
                <div
                  key={service.id}
                  className="group bg-white/70 dark:bg-dark-800/70 backdrop-blur-sm border border-white/20 dark:border-dark-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-12 h-12 ${colorClass} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={48} />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-3">
                    {service.name}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      ₺{service.price.toLocaleString('tr-TR')}
                    </span>
                    {service.image_url && (
                      <img
                        src={service.image_url}
                        alt={service.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <CheckoutButton
                      serviceId={service.id}
                      serviceName={service.name}
                      price={service.price}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}