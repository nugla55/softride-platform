import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-dark-900 to-dark-950 relative overflow-hidden">
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

      {/* Neon accent elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-neon-cyan/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-neon-green/20 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <Sparkles className="mx-auto h-16 w-16 text-neon-cyan animate-bounce" />
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          SoftRide ile
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green">
            Geleceğe Yolculuk
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-dark-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Modern yazılım çözümleriyle işletmenizi dijital dönüşüm yolculuğuna çıkarın.
          Güvenilir, yenilikçi ve sürdürülebilir teknolojilerle hedeflerinize ulaşın.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#services"
            className="group px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-900 font-semibold rounded-full hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 transform hover:scale-105"
          >
            Hizmetlerimizi Keşfedin
            <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard"
            className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            Müşteri Paneli
          </Link>
        </div>
      </div>
    </section>
  )
}