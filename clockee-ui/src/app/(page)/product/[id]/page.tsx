"use client";
import { ProductImage } from "@/app/components/common/Base64Image";
import { UserProductResponse } from "@/gen";
import { useAuth } from "@/lib/hooks/useAuth";
import { useCart } from "@/lib/hooks/useCart";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { number } from "zod";



export default function ProductDetail() {
  const params = useParams();  // ✅ Dùng useParams() thay vì useRouter()
  const id = params?.id; // Lấy ID từ URL
  const formatVND = (value?: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value ?? 0); 
  const [product, setProduct] = useState<UserProductResponse | null>(null);
  const {isAuthenticated} = useAuth();
  const [quantity, setQuantity] = useState(1);

  const {
    cart,
    totalItems,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    selectedItems,
    handleCheckItem,
    handleUncheckItem,
  } = useCart();

  
  useEffect(() => {
    //Fetch dữ liệu từ database
    const fertchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/user/products/${id}`);
        if(!res.ok) throw new Error("Không tìm được sản phẩm");
        const data = await res.json();
        setProduct(data);
        console.log(data)
      } catch (err){
        console.log("Lỗi khi fetch sản phẩm", err)
      }
    };
    fertchProduct();
  }, []);

  if (!product) {
    return <p className="text-center text-red-500 text-xl">Sản phẩm không tồn tại!</p>;
  }
  
  const handleAddToCart = () => {
    if(!isAuthenticated) {
      toast("Vui lòng đăng nhập !");
    } else {
      if(!product.isActive){
        toast("Sản phẩm đã ngừng kinh doanh !")
      } else {
        console.log("Add cart ...");
        if(quantity > (product.stock ?? 1)){
          toast("Số lượng vượt quá tồn kho !")
        }else {
          addToCart({
            productId: Number(id),
            name: product.name,
            price: product.sellPrice,
            quantity: quantity,
          });
        }
        
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row items-start gap-10 p-10 justify-center">
      {/* Hình ảnh sản phẩm */}
      <div className="flex flex-col items-center">
        <ProductImage data = {product.image ?? ""} />   
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col max-w-lg">
        <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
        <p className="text-gray-700 mt-2">{product.description} <br/>
          <span className="font-bold text-l text-gray">
            Thương hiệu: {product.brand?.name}
          </span>
        </p>
        <div className="mt-2">
          <p className="text-red-600 text-2xl font-bold">{formatVND(product.sellPrice)}</p>
        </div>
        {/* Số lượng thêm vào giỏ hàng */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center border rounded">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 text-lg"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(Number(e.target.value), product.stock ?? 1)))}
              className="w-12 text-center border-l border-r"
            />
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 text-lg"
            >
              +
            </button>
          </div>
        </div>
        <button className="mt-5 bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700"
        onClick={handleAddToCart}
        >
          THÊM VÀO GIỎ HÀNG
        </button>
        <div>
          {product.isActive ? 
            <p className="mt-3 text-gray-500"> {product.stock} sản phẩm có sẵn</p> :  
            <p className="mt-3 text-gray-500">Sản phẩm ngừng kinh doanh !</p>} 
        </div>
        
      </div>
    </div>
  );
}


