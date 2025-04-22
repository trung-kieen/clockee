"use client";
import { ProductImage } from "@/app/components/common/base-64-image";
import { ProductDetailsResponse, UserProductControllerService } from "@/gen";
import { useAuth } from "@/lib/hooks/use-auth";
import { useCart } from "@/lib/hooks/use-cart";
import { formatVND } from "@/util/currency";
import { logger } from "@/util/logger";
import { redirectAuthenticateAndGoBack } from "@/util/route";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params?.id); // Lấy ID từ URL
  const [product, setProduct] = useState<ProductDetailsResponse | null>(null);
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    //Fetch dữ liệu từ database
    const fertchProduct = async () => {
      try {
        const res = await UserProductControllerService.getProductById1(id);
        setProduct(res);
      } catch (err) {
        console.log("Lỗi khi fetch sản phẩm", err);
      }
    };
    fertchProduct();
  }, []);

  if (!product) {
    return (
      <p className="text-center text-red-500 text-xl">
        Sản phẩm không tồn tại!
      </p>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      redirectAuthenticateAndGoBack();
      toast("Vui lòng đăng nhập !");
    } else {
      if (!product.isActive) {
        toast.error("Sản phẩm đã ngừng kinh doanh !");
      } else {
        if (quantity > (product.stock ?? 1)) {
          toast.error("Số lượng vượt quá tồn kho !");
        } else {
          addToCart({
            productId: product.productId,
            name: product.name,
            price: product.sellPrice,
            image: product.image,
            quantity: quantity,
          });
          toast.success("Thêm thành công");
        }
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row items-start gap-10 p-10 justify-center">
      {/* Hình ảnh sản phẩm */}
      <div className="flex flex-col items-center">
        <div className="mask mask-square">
          <ProductImage data={product.image} />
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col max-w-lg">
        <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
        <p className="text-gray-700 mt-2">
          {product.description} <br />
          <span className="font-bold text-l text-gray">
            Thương hiệu: {product.brand?.name}
          </span>
        </p>
        <div className="mt-2">
          <p className="text-red-600 text-2xl font-bold">
            {formatVND(product.sellPrice)}
          </p>
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
            {quantity}
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 text-lg"
            >
              +
            </button>
          </div>
        </div>
        <button
          className="mt-5 bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700"
          onClick={handleAddToCart}
        >
          THÊM VÀO GIỎ HÀNG
        </button>
        <div>
          {product.isActive ? (
            <p className="mt-3 text-gray-500">
              {" "}
              {product.stock} sản phẩm có sẵn
            </p>
          ) : (
            <p className="mt-3 text-gray-500">Sản phẩm ngừng kinh doanh !</p>
          )}
        </div>
      </div>
    </div>
  );
}
