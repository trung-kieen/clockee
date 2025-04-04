USE clockeedb;

-- Insert into Brand
INSERT INTO brand (name, is_deleted)
VALUES ('Rolex', 0),
       ('Omega', 0),
       ('Casio', 0),
       ('Seiko', 0),
       ('Tag Heuer', 0),
       ('Citizen', 0),
       ('Tissot', 0),
       ('Longines', 0),
       ('Orient', 0),
       ('Patek Philippe', 0);

-- Insert into roles
INSERT INTO roles (role_name)
VALUES ('CUSTOMER'),
       ('PRODUCT_ADMIN'),
       ('INVENTORY_MANAGER');

-- Insert into User
INSERT INTO users (email, password, name, phone, address, is_deleted)
VALUES ('nguyen.van.a@gmail.com', 'hashedpassword1', 'Nguyễn Văn An', '0912345678', '123 Nguyễn Trãi, Hà Nội', 0),
       ('tran.thi.b@gmail.com', 'hashedpassword2', 'Trần Thị Bình', '0987654321', '456 Lê Lợi, TP.HCM', 0),
       ('le.van.c@yahoo.com', 'hashedpassword3', 'Lê Văn Cường', '0909123456', '78 Hùng Vương, Đà Nẵng', 0),
       ('pham.thi.d@gmail.com', 'hashedpassword4', 'Phạm Thị Dung', '0935123456', '12 Trần Phú, Huế', 0),
       ('hoang.van.e@hotmail.com', 'hashedpassword5', 'Hoàng Văn Em', '0978123456', '34 Nguyễn Huệ, Nha Trang', 0),
       ('vu.thi.f@gmail.com', 'hashedpassword6', 'Vũ Thị Phượng', '0918765432', '56 Phạm Ngũ Lão, Hà Nội', 0),
       ('dang.van.g@yahoo.com', 'hashedpassword7', 'Đặng Văn Giang', '0945123456', '89 Điện Biên Phủ, TP.HCM', 0),
       ('bui.thi.h@gmail.com', 'hashedpassword8', 'Bùi Thị Hạnh', '0967123456', '23 Lý Thường Kiệt, Đà Lạt', 0),
       ('do.van.k@hotmail.com', 'hashedpassword9', 'Đỗ Văn Khánh', '0923123456', '67 Hai Bà Trưng, Cần Thơ', 0),
       ('ngo.thi.l@gmail.com', 'hashedpassword10', 'Ngô Thị Lan', '0956123456', '45 Tôn Đức Thắng, Hải Phòng', 0),
       ('truong.van.m@yahoo.com', 'hashedpassword11', 'Trương Văn Minh', '0938123456', '90 Lê Đại Hành, Vinh', 0),
       ('ly.thi.n@gmail.com', 'hashedpassword12', 'Lý Thị Nga', '0917123456', '15 Pasteur, Quy Nhơn', 0);

-- Insert into Product
INSERT INTO product (name, description, image_url, actual_price, sell_price, type, stock, brand_id, is_active, visible)
VALUES ('Rolex Submariner', 'Đồng hồ lặn cao cấp', 'rolex_sub.jpg', 250000000, 230000000, 'Luxury', 8, 1, 1, 1),
       ('Omega Speedmaster', 'Dòng Moonwatch nổi tiếng', 'omega_speed.jpg', 180000000, 165000000, 'Luxury', 5, 2, 1, 1),
       ('Casio G-Shock', 'Đồng hồ thể thao bền bỉ', 'casio_gshock.jpg', 2500000, 2200000, 'Sport', 50, 3, 1, 1),
       ('Seiko Prospex', 'Đồng hồ lặn chuyên nghiệp', 'seiko_prospex.jpg', 12000000, 11000000, 'Sport', 20, 4, 1, 1),
       ('Tag Heuer Carrera', 'Đồng hồ đua xe sang trọng', 'tag_carrera.jpg', 90000000, 85000000, 'Luxury', 7, 5, 1, 1),
       ('Citizen Eco-Drive', 'Đồng hồ năng lượng mặt trời', 'citizen_eco.jpg', 8000000, 7500000, 'Casual', 30, 6, 1, 1),
       ('Tissot Le Locle', 'Đồng hồ cổ điển thanh lịch', 'tissot_locle.jpg', 15000000, 14000000, 'Classic', 15, 7, 1,
        1),
       ('Longines Master', 'Đồng hồ cao cấp Thụy Sĩ', 'longines_master.jpg', 60000000, 55000000, 'Luxury', 10, 8, 1, 1),
       ('Orient Bambino', 'Đồng hồ cơ giá rẻ', 'orient_bambino.jpg', 5000000, 4500000, 'Classic', 25, 9, 1, 1),
       ('Patek Philippe Nautilus', 'Đồng hồ siêu sang', 'patek_nautilus.jpg', 1200000000, 1150000000, 'Luxury', 2, 10,
        1, 1),
       ('Casio Edifice', 'Đồng hồ doanh nhân', 'casio_edifice.jpg', 3500000, 3200000, 'Casual', 40, 3, 1, 1),
       ('Seiko Astron', 'Đồng hồ GPS hiện đại', 'seiko_astron.jpg', 45000000, 42000000, 'Tech', 12, 4, 1, 1);

-- Insert into CartItem
INSERT INTO cart_item (product_id, user_id, quantity)
VALUES (1, 1, 1),
       (2, 2, 2),
       (3, 3, 3),
       (4, 4, 1),
       (5, 5, 2),
       (6, 6, 4),
       (7, 7, 1),
       (8, 8, 2),
       (9, 9, 3),
       (10, 10, 1);

-- Insert into Order
INSERT INTO orders (user_id, create_at, address, phone, total_price, status)
VALUES (1, '2025-01-15', '123 Nguyễn Trãi, Hà Nội', '0912345678', 230000000, 'PENDING'),
       (2, '2025-01-20', '456 Lê Lợi, TP.HCM', '0987654321', 330000000, 'SHIPPED'),
       (3, '2025-02-05', '78 Hùng Vương, Đà Nẵng', '0909123456', 6600000, 'SHIPPED'),
       (4, '2025-02-18', '12 Trần Phú, Huế', '0935123456', 11000000, 'PENDING'),
       (5, '2025-03-01', '34 Nguyễn Huệ, Nha Trang', '0978123456', 170000000, 'SHIPPED'),
       (6, '2025-03-10', '56 Phạm Ngũ Lão, Hà Nội', '0918765432', 30000000, 'SHIPPED'),
       (7, '2025-03-15', '89 Điện Biên Phủ, TP.HCM', '0945123456', 14000000, 'PENDING'),
       (8, '2025-03-25', '23 Lý Thường Kiệt, Đà Lạt', '0967123456', 110000000, 'SHIPPED'),
       (9, '2025-04-01', '67 Hai Bà Trưng, Cần Thơ', '0923123456', 13500000, 'SHIPPED'),
       (10, '2025-04-03', '45 Tôn Đức Thắng, Hải Phòng', '0956123456', 1150000000, 'PENDING');

-- Insert into OrderItem
INSERT INTO order_item (product_id, order_id, quantity, price)
VALUES (1, 1, 1, 230000000),
       (2, 2, 2, 165000000),
       (3, 3, 3, 2200000),
       (4, 4, 1, 11000000),
       (5, 5, 2, 85000000),
       (6, 6, 4, 7500000),
       (7, 7, 1, 14000000),
       (8, 8, 2, 55000000),
       (9, 9, 3, 4500000),
       (10, 10, 1, 1150000000),
       (11, 3, 2, 3200000),
       (12, 5, 1, 42000000);

-- Insert into Supplier
INSERT INTO supplier (name, address, phone, email, is_deleted)
VALUES ('Công ty Đồng Hồ Sài Gòn', '123 Nguyễn Thị Minh Khai, TP.HCM', '02812345678', 'saigonwatch@gmail.com', 0),
       ('Đồng Hồ Hà Nội', '45 Hàng Bông, Hà Nội', '02498765432', 'hanoi.watch@yahoo.com', 0),
       ('Nhà phân phối Casio VN', '67 Lê Văn Sỹ, TP.HCM', '02856789012', 'casio.vn@gmail.com', 0),
       ('Đồng Hồ Minh Anh', '89 Trần Hưng Đạo, Đà Nẵng', '02361234567', 'minhanh.watch@gmail.com', 0),
       ('Công ty Thụy Sĩ Luxury', '12 Lý Nam Đế, Hà Nội', '02487654321', 'swissluxury@gmail.com', 0),
       ('Đồng Hồ Hoàng Gia', '34 Nguyễn Huệ, Huế', '02345678901', 'hoanggia.watch@yahoo.com', 0),
       ('Nhà phân phối Seiko VN', '56 Phạm Hồng Thái, TP.HCM', '02834567890', 'seiko.vn@gmail.com', 0),
       ('Đồng Hồ Thời Đại', '78 Hai Bà Trưng, Hải Phòng', '02251234567', 'thoidai.watch@gmail.com', 0),
       ('Công ty Orient VN', '23 Lê Đại Hành, Nha Trang', '02587654321', 'orient.vn@gmail.com', 0),
       ('Đồng Hồ Cao Cấp', '45 Tôn Thất Tùng, Đà Lạt', '02631234567', 'caocap.watch@yahoo.com', 0);

-- Insert into Purchase
INSERT INTO purchase (product_id, supplier_id, price, quantity, total_price)
VALUES (1, 1, 200000000, 5, 1000000000),
       (2, 2, 150000000, 3, 450000000),
       (3, 3, 1800000, 20, 36000000),
       (4, 4, 9000000, 10, 90000000),
       (5, 5, 75000000, 4, 300000000),
       (6, 6, 6000000, 15, 90000000),
       (7, 7, 12000000, 8, 96000000),
       (8, 8, 50000000, 5, 250000000),
       (9, 9, 4000000, 12, 48000000),
       (10, 10, 1000000000, 2, 2000000000),
       (11, 3, 2800000, 10, 28000000),
       (12, 4, 38000000, 6, 228000000);