"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  sku: string;
  stock: number;
  images: string[];
}

const products: Product[] = [
  {
    id: 1,
    title: "Casio World Time AE-1000WHD-1AVDF",
    description:
      "Nam - Quartz (Pin) - Mặt Số 45 mm x 42.1 mm, Giờ Thế Giới, chống nước 10ATM",
    price: "1.506.000 đ",
    sku: "AE-1000WHD-1AVDF",
    stock: 7749,
    images: [
      "/product1.png",
      "/watch2.png",
      "/watch3.png",
      "/watch4.png",
      "/watch5.png",
    ],
  },
  {
    id: 2,
    title: "Casio Vintage A168WG-9WDF",
    description: "Nam - Quartz (Pin) - Mạ vàng sang trọng, chống nước cơ bản",
    price: "1.300.000 đ",
    sku: "A168WG-9WDF",
    stock: 3250,
    images: ["/watch2.png", "/watch3.png", "/watch4.png"],
  },
  {
    id: 3,
    title: "Casio Standard MW-240-1EVDF",
    description: "Nam - Quartz (Pin) - Thiết kế đơn giản, chống nước cơ bản",
    price: "800.000 đ",
    sku: "MW-240-1EVDF",
    stock: 5000,
    images: ["/watch3.png", "/watch4.png", "/watch5.png"],
  },
  {
    id: 4,
    title: "Casio G-Shock GA-2100-1A1DR",
    description: "Nam - Quartz (Pin) - Chống sốc, chống nước 20ATM",
    price: "2.500.000 đ",
    sku: "GA-2100-1A1DR",
    stock: 1500,
    images: ["/watch4.png", "/watch5.png", "/watch6.png"],
  },
  {
    id: 5,
    title: "Casio Edifice EFR-539D-1A2V",
    description: "Nam - Quartz (Pin) - Thiết kế mạnh mẽ, Chronograph",
    price: "3.200.000 đ",
    sku: "EFR-539D-1A2V",
    stock: 1000,
    images: ["/watch5.png", "/watch6.png", "/watch7.png"],
  },
  {
    id: 6,
    title: "Casio ProTrek PRG-240-1DR",
    description:
      "Nam - Quartz (Pin) - Đồng hồ dã ngoại, cảm biến nhiệt độ, độ cao",
    price: "4.800.000 đ",
    sku: "PRG-240-1DR",
    stock: 750,
    images: ["/watch6.png", "/watch7.png", "/watch8.png"],
  },
];

export default function ProductDetail() {
  const params = useParams(); // ✅ Dùng useParams() thay vì useRouter()
  const id = params?.id; // Lấy ID từ URL

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p) => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <p className="text-center text-red-500 text-xl">
        Sản phẩm không tồn tại!
      </p>
    );
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row items-start gap-10 p-10 justify-center">
      {/* Hình ảnh sản phẩm */}
      <div className="flex flex-col items-center">
        <img
          src={selectedImage || ""}
          alt={product.title}
          className="w-96 rounded-lg shadow-md"
        />
        <div className="flex gap-2 mt-4">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 cursor-pointer border-2 ${
                selectedImage === img ? "border-red-500" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col max-w-lg">
        <h1 className="text-3xl font-bold uppercase">{product.title}</h1>
        <p className="text-gray-700 mt-2">{product.description}</p>

        <div className="mt-4">
          <p className="text-gray-500">
            Mã Số Sản Phẩm: <b>{product.sku}</b>
          </p>
          <p className="text-red-600 text-2xl font-bold">{product.price}</p>
        </div>

        <button className="mt-5 bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700">
          THÊM VÀO GIỎ HÀNG
        </button>
        <p className="mt-3 text-gray-500">{product.stock} sản phẩm có sẵn</p>
      </div>
    </div>
  );
}
