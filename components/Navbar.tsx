'use client'

import Link from 'next/link'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-white/10 dark:bg-dark-900/80 backdrop-blur-md border-b border-white/20 dark:border-dark-700/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-900 dark:text-primary-100">
              SoftRide
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-dark-700 dark:text-dark-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Hizmetlerimiz
            </Link>
            <Link href="#references" className="text-dark-700 dark:text-dark-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Referanslar
            </Link>
            <Link href="/dashboard" className="text-dark-700 dark:text-dark-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Dashboard
            </Link>
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-200">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 dark:bg-dark-900/80 backdrop-blur-md rounded-lg mt-2">
              <Link href="#services" className="block px-3 py-2 text-dark-700 dark:text-dark-200 hover:text-primary-600 dark:hover:text-primary-400">
                Hizmetlerimiz
              </Link>
              <Link href="#references" className="block px-3 py-2 text-dark-700 dark:text-dark-200 hover:text-primary-600 dark:hover:text-primary-400">
                Referanslar
              </Link>
              <Link href="/dashboard" className="block px-3 py-2 text-dark-700 dark:text-dark-200 hover:text-primary-600 dark:hover:text-primary-400">
                Dashboard
              </Link>
              <button onClick={toggleTheme} className="w-full text-left px-3 py-2 text-dark-700 dark:text-dark-200">
                {isDark ? 'Açık Tema' : 'Koyu Tema'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}