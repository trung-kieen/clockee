USE clockeedb;

-- Insert into Brand (unchanged)
INSERT INTO brands (name, is_deleted)
VALUES ('Rolex', 0),
       ('Omega', 0),
       ('Casio', 0),
       ('Seiko', 0),
       ('Citizen', 0),
       ('Timex', 0),
       ('Patek Philippe', 0),
       ('Fossil', 0),
       ('Tissot', 0),
       ('Tag Heuer', 0),
       ('Audemars Piguet', 0),
       ('Breitling', 0),
       ('IWC', 0),
       ('Jaeger-LeCoultre', 0),
       ('Panerai', 0),
       ('Hublot', 0),
       ('Cartier', 0),
       ('Longines', 0),
       ('Montblanc', 0),
       ('Rado', 0),
       ('Oris', 0),
       ('Bulova', 0),
       ('Sinn', 0),
       ('Nomos', 0),
       ('Tudor', 0),
       ('Grand Seiko', 0),
       ('Blancpain', 0),
       ('Vacheron Constantin', 0),
       ('Breguet', 0),
       ('Girard-Perregaux', 0),
       ('Zenith', 0),
       ('Ulysse Nardin', 0),
       ('Glashütte Original', 0),
       ('Chopard', 0),
       ('Bell & Ross', 0),
       ('Maurice Lacroix', 0),
       ('Frederique Constant', 0),
       ('Raymond Weil', 0),
       ('Baume & Mercier', 0),
       ('Lorus', 0),
       ('Skagen', 0),
       ('Daniel Wellington', 0),
       ('Shinola', 0),
       ('G-Shock', 0),
       ('Swatch', 0),
       ('Victorinox', 0),
       ('Luminox', 0),
       ('Movado', 0),
       ('Ebel', 0),
       ('Hamilton', 0);

-- Insert into roles (unchanged)
INSERT INTO roles (role_name)
VALUES ('CUSTOMER'),
       ('PRODUCT_ADMIN'),
       ('INVENTORY_MANAGER');

-- Insert into User (unchanged)
SET IDENTITY_INSERT users ON;
INSERT INTO users (user_id, email, password, name, phone, address, is_deleted, is_verified)
VALUES (1, 'nguyen.van.a@gmail.com', 'hashedpassword1', N'Nguyễn Văn An', '0912345678', N'123 Nguyễn Trãi, Hà Nội', 0,
        1),
       (2, 'tran.thi.b@gmail.com', 'hashedpassword2', N'Trần Thị Bình', '0987654321', N'456 Lê Lợi, TP.HCM', 0, 1),
       (3, 'le.van.c@yahoo.com', 'hashedpassword3', N'Lê Văn Cường', '0909123456', N'78 Hùng Vương, Đà Nẵng', 0, 1),
       (4, 'pham.thi.d@gmail.com', 'hashedpassword4', N'Phạm Thị Dung', '0935123456', N'12 Trần Phú, Huế', 0, 1),
       (5, 'hoang.van.e@hotmail.com', 'hashedpassword5', N'Hoàng Văn Em', '0978123456', N'34 Nguyễn Huệ, Nha Trang', 0,
        1),
       (6, 'vu.thi.f@gmail.com', 'hashedpassword6', N'Vũ Thị Phượng', '0918765432', N'56 Phạm Ngũ Lão, Hà Nội', 0, 1),
       (7, 'dang.van.g@yahoo.com', 'hashedpassword7', N'Đặng Văn Giang', '0945123456', N'89 Điện Biên Phủ, TP.HCM', 0,
        1),
       (8, 'bui.thi.h@gmail.com', 'hashedpassword8', N'Bùi Thị Hạnh', '0967123456', N'23 Lý Thường Kiệt, Đà Lạt', 0, 1),
       (9, 'do.van.k@hotmail.com', 'hashedpassword9', N'Đỗ Văn Khánh', '0923123456', N'67 Hai Bà Trưng, Cần Thơ', 0, 1),
       (10, 'ngo.thi.l@gmail.com', 'hashedpassword10', N'Ngô Thị Lan', '0956123456', N'45 Tôn Đức Thắng, Hải Phòng', 0,
        1),
       (11, 'truong.van.m@yahoo.com', 'hashedpassword11', N'Trương Văn Minh', '0938123456', N'90 Lê Đại Hành, Vinh', 0,
        1),
       (12, 'quanlykho@clockee.com', '$2a$10$QPefYSDWQ35 fewZyVjzv34kGuX.5Gv/YKxWxZoDllX.HmdYd.hUwyNsi',
        N'nguyen van a', NULL, NULL, 0, 1),
       (13, 'admin@clockee.com', '$2a$10$QPefYSDWQ35ZyVjzv34kGuX.5Gv/YKxWxZoDllX.HmdYd.hUwyNsi', N'nguyen van b', NULL,
        NULL, 0, 1),
       (14, 'user@clockee.com', '$2a$10$QPefYSDWQ35ZyVjzv34kGuX.5Gv/YKxWxZoDllX.HmdYd.hUwyNsi', N'nguyen van c', NULL,
        NULL, 0, 1),
       (15, 'ly.thi.n@gmail.com', 'hashedpassword12', N'Lý Thị Nga', '0917123456', N'15 Pasteur, Quy Nhơn', 0, 1);
SET IDENTITY_INSERT users OFF;

-- Insert into roles_users (unchanged)
INSERT INTO roles_users (user_id, role_id)
VALUES (12, 3),
       (13, 2),
       (14, 1);

-- Insert into products (unchanged, extended as before)
INSERT INTO products (name, description, image_url, actual_price, sell_price, type, stock, brand_id, is_active, visible,
                      is_deleted)
VALUES ('Rolex Submariner', N'Đồng hồ lặn cao cấp', '15_DARK_MOOD_LADIES.jpg', 230000000, 250000000, 'Luxury', 8, 1, 1,
        1, 0),
       ('Omega Speedmaster', N'Dòng Moonwatch nổi tiếng', '20_Skeleton-Tourbillon-Mechanical-Watch.jpg', 165000000,
        180000000, 'Luxury', 5, 2, 1, 1, 0),
       ('Casio G-Shock', N'Đồng hồ thể thao bền bỉ', '30_Olevs-Genuine-Leather-Tourbillon-Luxury-Watch.jpg', 2200000,
        2500000, 'Sport', 50, 3, 1, 1, 0),
       ('Seiko Prospex', N'Đồng hồ lặn chuyên nghiệp', '32_NIBOSI-Gold-Watch-Mens-Watches.jpg', 11000000, 12000000,
        'Sport', 20, 4, 1, 1, 0),
       ('Tag Heuer Carrera', N'Đồng hồ đua xe sang trọng', '34_NAVIFORCE-Mens-Watches.jpg', 85000000, 90000000,
        'Luxury', 7, 5, 1, 1, 0),
       ('Citizen Eco-Drive', N'Đồng hồ năng lượng mặt trời', '38_maxresdefault.jpg', 7500000, 8000000, 'Casual', 30, 6,
        1, 1, 0),
       ('Tissot Le Locle', N'Đồng hồ cổ điển thanh lịch', '41_astron_brand_index.jpg', 14000000, 15000000, 'Classic',
        15, 7, 1, 1, 0),
       ('Longines Master', N'Đồng hồ cao cấp Thụy Sĩ', '43_Luxury-Watch-Brands.jpg', 55000000, 60000000, 'Luxury', 10,
        8, 1, 1, 0),
       ('Orient Bambino', N'Đồng hồ cơ giá rẻ', '49_best-luxury-watch-brands.jpg', 4500000, 5000000, 'Classic', 25, 9,
        1, 1, 0),
       ('Patek Philippe Nautilus', N'Đồng hồ siêu sang', '50_post_7_6718.jpg', 1150000000, 1200000000, 'Luxury', 2, 10,
        1, 1, 0),
       ('Casio Edifice', N'Đồng hồ doanh nhân', '51_Patek-Philippe-Nautilus-40th-Anniversary-57961G-2.jpg', 3200000,
        3500000, 'Casual', 40, 3, 1, 1, 0),
       ('Seiko Astron', N'Đồng hồ GPS hiện đại', '54_Luxury-Watch-Brands-scaled.jpg', 42000000, 45000000, 'Tech', 12, 4,
        1, 1, 0),
       ('Audemars Piguet Royal Oak', N'Đồng hồ thể thao sang trọng',
        '55_2016New-Fashion-Casual-Mens-Watches-Top-Brand-Luxury-YAZOLE-Business-Watch-Men-Leather-Quartz-Blue-Ray.jpg',
        650000000, 700000000, 'Luxury', 3, 11, 1, 1, 0),
       ('Breitling Navitimer', N'Đồng hồ phi công huyền thoại', '56_luxury-watch-auction-scaled.jpg', 180000000,
        200000000, 'Luxury', 6, 12, 1, 1, 0),
       ('Fossil Townsman', N'Đồng hồ thời trang hiện đại', '57_59ef6862637b4.jpg', 3500000, 4000000, 'Casual', 35, 8, 1,
        1, 0),
       ('Tudor Black Bay', N'Đồng hồ lặn phong cách cổ điển',
        '58_This-premium-luxury-watch-will-make-you-feel-like-Harvey-Spector-Victoriaoscuro-02.jpg', 85000000, 90000000,
        'Luxury', 10, 25, 1, 1, 0),
       ('Grand Seiko Snowflake', N'Đồng hồ cơ thủ công',
        '59_Relogio-Masculino-LIGE-Mens-Watches-Top-Brand-Luxury-Quartz-Gold-Watch-Men-Casual-Leather-Military-Waterproof.jpg',
        130000000, 140000000, 'Luxury', 4, 26, 1, 1, 0),
       ('Swatch Big Bold', N'Đồng hồ thời trang trẻ trung',
        '60_Montre-Homme-PINDU-Mens-Watches-Top-Brand-Luxury-Jacob-Co-Astronomia-Solar-Watch-Basel-World-Quartz.jpg_Q90.jpg_.jpg',
        2000000, 2300000, 'Casual', 60, 45, 1, 1, 0),
       ('Hamilton Khaki Field', N'Đồng hồ quân đội bền bỉ', '61_Top-10-Luxury-Watches-For-Men-scaled.jpg', 12000000,
        13000000, 'Sport', 18, 50, 1, 1, 0),
       ('Cartier Tank Solo', N'Đồng hồ thanh lịch cổ điển', '62_ap-ro.jpg', 75000000, 80000000, 'Classic', 8, 17, 1, 1,
        0);

-- Insert into CartItem (unchanged)
INSERT INTO cart_items (product_id, user_id, quantity)
VALUES (1, 1, 1),
       (2, 2, 2),
       (3, 3, 3),
       (4, 4, 1),
       (5, 5, 2),
       (6, 6, 4),
       (7, 7, 1),
       (8, 8, 2),
       (9, 9, 3),
       (1, 14, 3),
       (4, 14, 5),
       (6, 13, 2),
       (4, 13, 2),
       (7, 12, 5),
       (8, 12, 2),
       (10, 10, 1);

-- Insert into orders (2023-2025)
SET IDENTITY_INSERT orders ON;
INSERT INTO orders (order_id, user_id, created_at, address, phone, total_price, status)
VALUES
-- 2023
(1, 1, '2023-03-10', N'123 Nguyễn Trãi, Hà Nội', '0912345678', 250000000, 'SHIPPED'),
(2, 2, '2023-04-15', N'456 Lê Lợi, TP.HCM', '0987654321', 360000000, 'SHIPPED'),
(3, 3, '2023-05-20', N'78 Hùng Vương, Đà Nẵng', '0909123456', 13900000, 'SHIPPED'),
(4, 4, '2023-06-25', N'12 Trần Phú, Huế', '0935123456', 12000000, 'PENDING'),
(5, 5, '2023-07-30', N'34 Nguyễn Huệ, Nha Trang', '0978123456', 222000000, 'SHIPPED'),
-- 2024
(6, 6, '2024-01-05', N'56 Phạm Ngũ Lão, Hà Nội', '0918765432', 117000000, 'SHIPPED'),
(7, 7, '2024-02-10', N'89 Điện Biên Phủ, TP.HCM', '0945123456', 15000000, 'PENDING'),
(8, 8, '2024-03-15', N'23 Lý Thường Kiệt, Đà Lạt', '0967123456', 345000000, 'SHIPPED'),
(9, 9, '2024-04-20', N'67 Hai Bà Trưng, Cần Thơ', '0923123456', 15000000, 'SHIPPED'),
(10, 10, '2024-05-25', N'45 Tôn Đức Thắng, Hải Phòng', '0956123456', 1206000000, 'PENDING'),
-- 2025
(11, 1, '2025-01-15', N'123 Nguyễn Trãi, Hà Nội', '0912345678', 900000000, 'PENDING'),
(12, 2, '2025-01-20', N'456 Lê Lợi, TP.HCM', '0987654321', 522000000, 'SHIPPED'),
(13, 3, '2025-02-05', N'78 Hùng Vương, Đà Nẵng', '0909123456', 13600000, 'SHIPPED'),
(14, 4, '2025-02-18', N'12 Trần Phú, Huế', '0935123456', 11000000, 'PENDING'),
(15, 5, '2025-03-01', N'34 Nguyễn Huệ, Nha Trang', '0978123456', 212000000, 'SHIPPED'),
(16, 6, '2025-03-10', N'56 Phạm Ngũ Lão, Hà Nội', '0918765432', 30000000, 'SHIPPED'),
(17, 7, '2025-03-15', N'89 Điện Biên Phủ, TP.HCM', '0945123456', 14000000, 'PENDING'),
(18, 8, '2025-03-25', N'23 Lý Thường Kiệt, Đà Lạt', '0967123456', 255000000, 'SHIPPED'),
(19, 9, '2025-04-01', N'67 Hai Bà Trưng, Cần Thơ', '0923123456', 13500000, 'SHIPPED'),
(20, 10, '2025-04-03', N'45 Tôn Đức Thắng, Hải Phòng', '0956123456', 1230000000, 'PENDING');
SET IDENTITY_INSERT orders OFF;

-- Insert into order_items (aligned with orders)
INSERT INTO order_items (product_id, order_id, quantity, price)
VALUES
-- 2023
(1, 1, 1, 250000000),
(2, 2, 2, 180000000),
(3, 3, 3, 2500000),
(15, 3, 2, 3200000),
(4, 4, 1, 12000000),
(5, 5, 2, 90000000),
(12, 5, 1, 42000000),
-- 2024
(6, 6, 4, 8000000),
(16, 6, 1, 85000000),
(7, 7, 1, 15000000),
(8, 8, 2, 60000000),
(17, 8, 1, 140000000),
(20, 8, 1, 80000000),
(9, 9, 3, 5000000),
(10, 10, 1, 1200000000),
(18, 10, 3, 2000000),
-- 2025
(1, 11, 1, 250000000),
(13, 11, 1, 650000000),
(2, 12, 2, 180000000),
(14, 12, 1, 180000000),
(19, 12, 1, 12000000),
(3, 13, 3, 2500000),
(15, 13, 2, 3500000),
(4, 14, 1, 11000000),
(5, 15, 2, 85000000),
(12, 15, 1, 42000000),
(6, 16, 4, 7500000),
(7, 17, 1, 14000000),
(8, 18, 2, 55000000),
(17, 18, 1, 130000000),
(20, 18, 1, 75000000),
(9, 19, 3, 4500000),
(10, 20, 1, 1200000000),
(18, 20, 3, 2300000);

-- Insert into Supplier (unchanged)
INSERT INTO suppliers (name, address, phone, email, is_deleted)
VALUES (N'Công ty Đồng Hồ Sài Gòn', N'123 Nguyễn Thị Minh Khai, TP.HCM', '02812345678', 'saigonwatch@gmail.com', 0),
       (N'Đồng Hồ Hà Nội', N'45 Hàng Bông, Hà Nội', '02498765432', 'hanoi.watch@yahoo.com', 0),
       (N'Nhà phân phối Casio VN', N'67 Lê Văn Sỹ, TP.HCM', '02856789012', 'casio.vn@gmail.com', 0),
       (N'Đồng Hồ Minh Anh', N'89 Trần Hưng Đạo, Đà Nẵng', '02361234567', 'minhanh.watch@gmail.com', 0),
       (N'Công ty Thụy Sĩ Luxury', N'12 Lý Nam Đế, Hà Nội', '02487654321', 'swissluxury@gmail.com', 0),
       (N'Đồng Hồ Hoàng Gia', N'34 Nguyễn Huệ, Huế', '02345678901', 'hoanggia.watch@yahoo.com', 0),
       (N'Nhà phân phối Seiko VN', N'56 Phạm Hồng Thái, TP.HCM', '02834567890', 'seiko.vn@gmail.com', 0),
       (N'Đồng Hồ Thời Đại', N'78 Hai Bà Trưng, Hải Phòng', '02251234567', 'thoidai.watch@gmail.com', 0),
       (N'Công ty Orient VN', N'23 Lê Đại Hành, Nha Trang', '02587654321', 'orient.vn@gmail.com', 0),
       (N'Đồng Hồ Cao Cấp', N'45 Tôn Thất Tùng, Đà Lạt', '02631234567', 'caocap.watch@yahoo.com', 0);

-- Insert into purchases (2023-2025)
SET IDENTITY_INSERT purchases ON;
INSERT INTO purchases (purchase_id, created_by, total_price, created_at)
VALUES
-- 2023
(1, 12, 1000000000, '2023-01-01'),
(2, 12, 450000000, '2023-02-01'),
(3, 12, 36000000, '2023-03-01'),
(4, 12, 90000000, '2023-04-01'),
(5, 12, 300000000, '2023-05-01'),
-- 2024
(6, 12, 90000000, '2024-01-01'),
(7, 12, 96000000, '2024-02-01'),
(8, 12, 250000000, '2024-03-01'),
(9, 12, 48000000, '2024-04-01'),
(10, 12, 2000000000, '2024-05-01'),
-- 2025
(11, 12, 188000000, '2025-01-01'),
(12, 12, 388000000, '2025-02-01'),
(13, 12, 641400000, '2025-03-01'),
(14, 12, 194000000, '2025-04-01'),
(15, 12, 108400000, '2025-05-01');
SET IDENTITY_INSERT purchases OFF;

-- Insert into purchase_items (2023-2025)
SET IDENTITY_INSERT purchase_items ON;
INSERT INTO purchase_items (purchase_item_id, product_id, supplier_id, price, quantity, created_at, purchase_id)
VALUES
-- 2023
(1, 1, 1, 200000000, 5, '2023-01-01', 1),
(2, 2, 2, 150000000, 3, '2023-02-01', 2),
(3, 3, 3, 1800000, 20, '2023-03-01', 3),
(4, 4, 4, 9000000, 10, '2023-04-01', 4),
(5, 5, 5, 75000000, 4, '2023-05-01', 5),
-- 2024
(6, 6, 6, 6000000, 15, '2024-01-01', 6),
(7, 7, 7, 12000000, 8, '2024-02-01', 7),
(8, 8, 8, 50000000, 5, '2024-03-01', 8),
(9, 9, 9, 4000000, 12, '2024-04-01', 9),
(10, 10, 10, 1000000000, 2, '2024-05-01', 10),
-- 2025
(11, 11, 3, 2800000, 10, '2025-01-01', 11),
(12, 12, 4, 38000000, 6, '2025-02-01', 12),
(13, 13, 5, 600000000, 1, '2025-03-01', 13),
(14, 14, 2, 150000000, 1, '2025-04-01', 14),
(15, 15, 3, 3200000, 12, '2025-05-01', 15),
(16, 16, 1, 80000000, 2, '2025-01-01', 11),
(17, 17, 5, 120000000, 1, '2025-02-01', 12),
(18, 18, 3, 1800000, 20, '2025-03-01', 13),
(19, 19, 7, 11000000, 4, '2025-04-01', 14),
(20, 20, 8, 70000000, 1, '2025-05-01', 15);
SET IDENTITY_INSERT purchase_items OFF;