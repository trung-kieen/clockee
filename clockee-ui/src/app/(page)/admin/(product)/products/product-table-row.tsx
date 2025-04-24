"use client";
import { ProductImage } from "@/app/components/common/base-64-image";
import Thumbnail from "@/app/components/common/thumbnail";
import ConfirmModal from "@/app/components/modal/confirm-modal";
import { AdminProductResponse } from "@/gen/models/AdminProductResponse";
import { AdminProductControllerService } from "@/gen/services/AdminProductControllerService";
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
    <tr className="whitespace-nowrap text-xl text-center">
      <td className={`border-l-4 ${tdStyle}`}>{item.productId}</td>
      {/* <td  className="border border-gray-200 px-4 py-3">
        {item.image && (
          <Thumbnail className="h-[100px] w-[100px]">
            <ProductImage data={item.image} />
          </Thumbnail>
        )}
      </td> */}
      <td className={`${tdStyle}`}>{item.name}</td>
      <td className={`${tdStyle}`}>{formatVND(item.actualPrice)}</td>
      <td className={`${tdStyle}`}>{formatVND(item.sellPrice)}</td>
      <td className={`${tdStyle}`}>{item.type}</td>
      <td className={`${tdStyle}`}>{item.brand?.name}</td>
      <td className= {`hover:bg-gray-200 ${tdStyle}`}>
        <Link href={`/admin/products/${item.productId}/edit`}>
          {/* Action edit */}
          <i className="fa fa-external-link-alt  cursor-pointer"></i>
        </Link>
      </td>
      <td
        onClick={() => {
          setIsOpenConfirm(true);
        }}
        className={`hover:bg-gray-200 ${tdStyle} border-r-4 `}
      >
        {/* Action delete */}
        <i className="fa fa-trash"></i>
        <ConfirmModal
          isOpen={isOpenConfirm}
          onClose={() => setIsOpenConfirm(false)}
          onConfirm={handleDelete}
          title={"Xác nhận"}
          content={"Bạn có muốn xóa nhãn hàng này?"}
        />
      </td>
    </tr>
  );
};
export default ProductTableRow;
