'use client'

import { useState } from 'react'
import { processPayment } from '../src/actions/checkout'
import { X, CreditCard, Loader2, CheckCircle, Sparkles } from 'lucide-react'

interface CheckoutButtonProps {
  serviceId: string
  serviceName: string
  price: number
}

export default function CheckoutButton({ serviceId, serviceName, price }: CheckoutButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await processPayment({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        serviceId,
        serviceName,
        totalPrice: price
      })

      setIsSuccess(true)
      setTimeout(() => {
        setIsOpen(false)
        setIsSuccess(false)
        setFormData({ customerName: '', customerEmail: '' })
      }, 3000)
    } catch (error) {
      console.error('Ödeme hatası:', error)
      alert('Ödeme işlemi sırasında hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 transform hover:scale-105"
      >
        <span className="flex items-center justify-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Satın Al - ₺{price.toLocaleString('tr-TR')}</span>
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">
                  {serviceName}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-dark-400 hover:text-dark-600 dark:text-dark-400 dark:hover:text-dark-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="relative">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                    <Sparkles className="h-4 w-4 text-blue-400 absolute top-4 -left-2 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <Sparkles className="h-5 w-5 text-purple-400 absolute bottom-2 right-2 animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                  <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
                    Sipariş Başarıyla Oluşturuldu!
                  </h4>
                  <p className="text-dark-600 dark:text-dark-300">
                    En kısa sürede sizinle iletişime geçeceğiz.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-dark-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-neon-blue focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div className="bg-dark-50 dark:bg-dark-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-600 dark:text-dark-300">Toplam Tutar:</span>
                      <span className="text-xl font-bold text-dark-900 dark:text-white">
                        ₺{price.toLocaleString('tr-TR')}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>İşleniyor...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Ödeme Yap</span>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}