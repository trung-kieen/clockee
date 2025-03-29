
import ConfirmModal from "@/app/components/modal/ConfirmModal";
import { BrandControllerService, BrandDTO } from "@/gen";
import React, { useState } from "react"
import EditBrandModal from "./EditBrandModal";
const BrandItem = ({ item, refreshCallBack }: { item: BrandDTO, refreshCallBack: () => void }) => {

  function handleDelete(): void {
    if (!item.brandId) {
      return;
    }
    BrandControllerService.deleteBrand(item.brandId);
    setIsOpenConfirmModal(false);
    refreshCallBack();

  }
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [isEditModal, setIsEditModal] = useState(false);

  return (
    <tr >

      <EditBrandModal
        isOpen={isEditModal}
        onClose={() => setIsEditModal(false)}
        refreshCallBack={refreshCallBack}
        model={item} />
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onClose={() => setIsOpenConfirmModal(false)}
        onConfirm={handleDelete}
        title={"Xác nhận"}
        content={"Bạn có muốn xóa nhãn hàng này?"}
      />
      <td >{item.brandId}</td>
      <td >{item.name}</td>
      <td onClick={() => setIsEditModal(true)} className="hover:bg-gray-200">
        {/* Action edit */}
        <i className="fa fa-edit"></i>
      </td>
      <td onClick={() => setIsOpenConfirmModal(true)} className="hover:bg-gray-200">
        {/* Action delete */}
        <i className="fa fa-trash"></i>
      </td>
    </tr>
  )

}
export default BrandItem;
