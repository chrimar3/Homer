-- Sample data for Homer Jewelry

-- Insert sample products
INSERT INTO products (name, description, price, category, subcategory, materials, in_stock, featured, slug) VALUES
('Classic Gold Grillz', 'Premium 14K gold grillz with custom fit', 1500.00, 'grillz', 'gold', ARRAY['14K Gold'], true, true, 'classic-gold-grillz'),
('Diamond Grillz Set', 'Luxury grillz with VVS diamonds', 5000.00, 'grillz', 'diamond', ARRAY['18K Gold', 'VVS Diamonds'], true, true, 'diamond-grillz-set'),
('Silver Cuban Link Chain', 'Heavy 925 sterling silver Cuban link', 800.00, 'jewelry', 'chains', ARRAY['Sterling Silver'], true, false, 'silver-cuban-link'),
('Gold Signet Ring', 'Custom engraved 18K gold signet ring', 2200.00, 'jewelry', 'rings', ARRAY['18K Gold'], true, true, 'gold-signet-ring'),
('Diamond Tennis Bracelet', 'Classic diamond tennis bracelet', 3500.00, 'jewelry', 'bracelets', ARRAY['14K White Gold', 'Diamonds'], true, false, 'diamond-tennis-bracelet');

-- Insert sample gallery items
INSERT INTO gallery (title, description, image_url, category, featured) VALUES
('Celebrity Custom Grillz', 'Custom designed for international artist', '/images/gallery/celebrity-grillz.jpg', 'grillz', true),
('Bespoke Wedding Set', 'Unique wedding rings with personal engravings', '/images/gallery/wedding-set.jpg', 'rings', true),
('VIP Collection', 'Exclusive pieces for our VIP clients', '/images/gallery/vip-collection.jpg', 'custom', true);

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, customer_location, rating, review, verified, featured) VALUES
('Maria K.', 'Athens, Greece', 5, 'Absolutely stunning work! Homer created the perfect custom grillz for me.', true, true),
('James T.', 'London, UK', 5, 'The quality and attention to detail is unmatched. Highly recommend!', true, true),
('Sophie L.', 'Paris, France', 5, 'My engagement ring is beyond beautiful. Thank you Homer!', true, false);

-- Insert sample newsletter subscribers
INSERT INTO newsletter (email) VALUES
('welcome@example.com');