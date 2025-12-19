import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import References from '../components/References'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 transition-colors duration-500">
      <Navbar />
      <Hero />
      <Services />
      <References />
      <Footer />
    </div>
  )
}
