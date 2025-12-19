-- SoftRide Database Schema
-- Bu SQL sorgusunu Supabase SQL Editor'a yapıştırarak tabloları oluşturun

-- Services tablosu
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders tablosu
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) etkinleştirme
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Services için temel politikalar (herkes okuyabilir)
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (true);

-- Orders için politikalar (geçici olarak herkes insert edebilir - development için)
CREATE POLICY "Orders are viewable by everyone" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Orders can be inserted by everyone" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders can be updated by everyone" ON orders
  FOR UPDATE USING (true);

-- Örnek veriler ekleme
INSERT INTO services (name, description, price, image_url) VALUES
('Web Tasarım', 'Modern ve responsive web sitesi tasarımı. Kullanıcı dostu arayüzler ve mobil uyumluluk.', 2500.00, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'),
('Mobil Uygulama', 'iOS ve Android platformları için native mobil uygulama geliştirme.', 5000.00, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400'),
('SEO Optimizasyonu', 'Arama motoru optimizasyonu ile web sitenizin görünürlüğünü artırın.', 1500.00, 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=400');

-- Indexes for better performance
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_service_id ON orders(service_id);
CREATE INDEX idx_services_name ON services(name);