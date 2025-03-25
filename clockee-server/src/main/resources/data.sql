USE clockeedb;

INSERT INTO roles(role_name) VALUES('CUSTOMER');
INSERT INTO roles(role_name) VALUES('PRODUCT_ADMIN');
INSERT INTO roles(role_name) VALUES('INVENTORY_MANAGER');

-- Insert into Brand
INSERT INTO brands (name, is_deleted) VALUES
('Rolex', 0),
('Omega', 0),
('Casio', 0),
('Seiko', 0),
('Tag Heuer', 0);

-- Insert into User
INSERT INTO [users] (email, password, name, phone, address, is_deleted) VALUES
('john.doe@example.com', 'hashedpassword1', 'John Doe', '1234567890', '123 Elm St', 0),
('jane.doe@example.com', 'hashedpassword2', 'Jane Doe', '0987654321', '456 Oak St', 0);

INSERT INTO roles_users (user_id, role_id) VALUES
(1, 1),
(2, 2);

-- Insert into Product
INSERT INTO products (name, description, image_url, actual_price, sell_price, type, stock, brand_id, is_active, visible) VALUES
('Rolex Submariner', 'Luxury diving watch', 'rolex.jpg', 10000, 9500, 'Luxury', 10, 1, 1, 1),
('Omega Speedmaster', 'Moonwatch series', 'omega.jpg', 8000, 7500, 'Luxury', 5, 2, 1, 1);

-- Insert into CartItem
INSERT INTO cart_items (product_id, user_id, quantity) VALUES
(1, 1, 2),
(2, 2, 1);

-- Insert into Order
INSERT INTO [orders] (user_id, create_at, address, phone, total_price, status) VALUES
(1, GETDATE(), '123 Elm St', '1234567890', 19000, 'PENDING');

-- Insert into OrderItem
INSERT INTO order_items (product_id, order_id, quantity, price) VALUES
(1, 1, 2, 9500);

-- Insert into Supplier
INSERT INTO suppliers (name, address, phone, email, is_deleted) VALUES
('Watch Supplier Ltd.', '789 Maple St', '1122334455', 'supplier@example.com', 0);

-- Insert into Purchase
INSERT INTO purchases (product_id, supplier_id, price, quantity, total_price) VALUES
(1, 1, 8000, 5, 40000);
