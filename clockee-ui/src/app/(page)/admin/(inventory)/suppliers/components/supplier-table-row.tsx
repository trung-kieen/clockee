import ConfirmModal from "@/app/components/modal/confirm-modal";
import { AdminSupplierControllerService, SupplierDTO } from "@/gen";
import React, { useState } from "react";
import { toast } from "react-toastify";
import EditSupplierModal from "./edit-supplier-modal";
const SupplierTableRow = ({
  item,
  refreshCallBack,
}: {
  item: SupplierDTO;
  refreshCallBack: () => void;
}) => {
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
  };
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [isEditModal, setIsEditModal] = useState(false);

  const tdStyle = "border-2 border-t-0 border-b-4 border-gray-200 px-4 py-3";
  return (
    <tr className="whitespace-nowrap text-xl text-center">
      <EditSupplierModal
        isOpen={isEditModal}
        onClose={() => setIsEditModal(false)}
        refreshCallBack={refreshCallBack}
        model={item}
      />
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onClose={() => setIsOpenConfirmModal(false)}
        onConfirm={handleDelete}
        title={"Xác nhận"}
        content={"Bạn có muốn xóa nhà cung cấp này?"}
      />
      <td className={`border-l-4 ${tdStyle}`}>{item.supplierId}</td>
      <td className={`${tdStyle}`}>{item.name}</td>
      <td className={`${tdStyle}`}>{item.address}</td>
      <td className={`${tdStyle}`}>{item.phone}</td>
      <td className={`${tdStyle}`}>{item.email}</td>
      <td onClick={() => setIsEditModal(true)} className= {`hover:bg-gray-200 ${tdStyle}`}>
        {/* Action edit */}
        <i className="fa fa-edit cursor-pointer"></i>
      </td>
      <td
        onClick={() => setIsOpenConfirmModal(true)}
         className={`hover:bg-gray-200 ${tdStyle} border-r-4 `}
      >
        {/* Action delete */}
        <i className="fa fa-trash cursor-pointer"></i>
      </td>
    </tr>
  );
};
export default SupplierTableRow;
