import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    company: 'TechCorp',
    role: 'CTO',
    content: 'SoftRide ile çalışmak harika bir deneyim oldu. Profesyonel ekip ve kaliteli hizmet.',
    rating: 5,
    avatar: 'AY'
  },
  {
    name: 'Ayşe Kaya',
    company: 'Innovate Ltd.',
    role: 'CEO',
    content: 'Projemizi zamanında ve bütçe dahilinde tamamladılar. Kesinlikle tavsiye ederim.',
    rating: 5,
    avatar: 'AK'
  },
  {
    name: 'Mehmet Demir',
    company: 'Digital Solutions',
    role: 'Project Manager',
    content: 'Teknik uzmanlıkları ve müşteri odaklı yaklaşımları ile öne çıkıyorlar.',
    rating: 5,
    avatar: 'MD'
  }
]

export default function References() {
  return (
    <section id="references" className="py-20 bg-gradient-to-br from-primary-900 to-dark-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-neon-blue/5"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-neon-cyan/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Referanslarımız
          </h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto">
            Müşterilerimizin memnuniyeti bizim için en büyük ödül.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 dark:bg-dark-800/20 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Quote className="text-neon-cyan h-8 w-8 mr-2" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-neon-yellow fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-dark-200 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full flex items-center justify-center text-dark-900 font-semibold mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-dark-400">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}