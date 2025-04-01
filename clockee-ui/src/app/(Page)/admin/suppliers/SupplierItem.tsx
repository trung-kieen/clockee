import ConfirmModal from "@/app/components/modal/ConfirmModal";
import { AdminSupplierControllerService, SupplierDTO } from "@/gen";
import React, { useState } from "react"
import { toast } from "react-toastify";
import EditSupplierModal from "./EditSupplierModal";
const SupplierItem = ({ item, refreshCallBack }: { item: SupplierDTO, refreshCallBack: () => void }) => {

  const handleDelete = async () => {
    if (!item.supplierId) {
      return;
    }
    try {
      await AdminSupplierControllerService.deleteSupplier(item.supplierId);
      setIsOpenConfirmModal(false);
      refreshCallBack();
      toast("Xóa thành công");
    } catch (e) {
      toast(e as string);
    }

  }
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [isEditModal, setIsEditModal] = useState(false);

  return (
    <tr >

      <EditSupplierModal
        isOpen={isEditModal}
        onClose={() => setIsEditModal(false)}
        refreshCallBack={refreshCallBack}
        model={item} />
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onClose={() => setIsOpenConfirmModal(false)}
        onConfirm={handleDelete}
        title={"Xác nhận"}
        content={"Bạn có muốn xóa nhà cung cấp này?"}
      />
      <td >{item.supplierId}</td>
      <td >{item.name}</td>
      <td >{item.address}</td>
      <td >{item.phone}</td>
      <td >{item.email}</td>
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
export default SupplierItem;
