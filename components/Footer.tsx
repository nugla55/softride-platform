import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-900 dark:bg-dark-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">SoftRide</h3>
            <p className="text-dark-300 mb-6 max-w-md">
              Modern yazılım çözümleriyle işletmenizi geleceğe taşıyoruz.
              Güvenilir, yenilikçi ve sürdürülebilir teknolojiler.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-400 hover:text-neon-cyan transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-dark-400 hover:text-neon-cyan transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-dark-400 hover:text-neon-cyan transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-dark-300 hover:text-white transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="#references" className="text-dark-300 hover:text-white transition-colors">
                  Referanslar
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-dark-300 hover:text-white transition-colors">
                  Müşteri Paneli
                </Link>
              </li>
              <li>
                <a href="#" className="text-dark-300 hover:text-white transition-colors">
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 mr-2" />
                <span className="text-dark-300">info@softride.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary-400 mr-2" />
                <span className="text-dark-300">+90 555 123 4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary-400 mr-2" />
                <span className="text-dark-300">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8 text-center">
          <p className="text-dark-400">
            © 2025 SoftRide. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}