"use client";
import ConfirmModal from "@/app/components/modal/confirm-modal";
import { AdminProductResponse } from "@/gen/models/AdminProductResponse";
import { AdminProductControllerService } from "@/gen/services/AdminProductControllerService";
import { formatVND } from "@/util/currency";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

type ProductRowProps = {
  item: AdminProductResponse;
  refreshCallBack: () => void;
};

const ProductTableRow = ({ item, refreshCallBack }: ProductRowProps) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const handleDelete = async () => {
    if (!item.productId) {
      return;
    }
    try {
      await AdminProductControllerService.deleteProduct(item.productId);
      setIsOpenConfirm(false);
      refreshCallBack();
      toast("Xóa thành công");
    } catch (e) {
      toast(e as string);
    }
  };

  const formatVND = (value?: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value ?? 0);

  const tdStyle = "border-2 border-t-0 border-b-4 border-gray-200 px-4 py-3";

  return (
    <tr>
      <td>{item.productId}</td>
      <td>
        {item.image && (
          <Thumbnail className="h-[100px] w-[100px]">
            <ProductImage data={item.image} />
          </Thumbnail>
        )}
      </td>
      <td>{item.name}</td>
      <td>{formatVND(item.actualPrice)}</td>
      <td>{formatVND(item.sellPrice)}</td>
      <td>{item.type}</td>
      <td>{item.brand?.name}</td>
      <td className="hover:bg-gray-200">
        <Link href={`/admin/products/${item.productId}/edit`}>
          {/* Action edit */}
          <i className="fa fa-external-link-alt  cursor-pointer"></i>
        </Link>
      </td>
      <td
        onClick={() => {
          setIsOpenConfirm(true);
        }}
        className="hover:bg-gray-200"
      >
        {/* Action delete */}
        <i className="fa fa-trash"></i>
        <ConfirmModal
          onClose={() => setIsOpenConfirm(false)}
          isOpen={isOpenConfirm}
          onConfirm={handleDelete}
          title={"Xác nhận"}
          content={`Xóa sản phẩm "${item.name}"?`}
        />
      )}
    </>
    
  );
};
export default ProductTableRow;
