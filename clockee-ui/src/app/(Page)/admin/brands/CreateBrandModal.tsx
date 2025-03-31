import ClockeeModal from "@/app/components/modal/Modal";
import ErrorText from "@/app/components/typography/ErrorText";
import { AdminBrandControllerService, BrandDTO } from "@/gen";
import { mapApiErrorsToForm } from "@/utils/form";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify";
const CreateBrandModal = ({ isOpen, onClose, refreshCallBack }: {
  isOpen: boolean,
  onClose: () => void,
  refreshCallBack: () => void,
}) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandDTO>()
  const onSubmit: SubmitHandler<BrandDTO> = async (data) => {

    try {
      await AdminBrandControllerService.addBrand(data);
      onClose();
      refreshCallBack();
      toast("Thêm thành công");

    } catch (e) {
      mapApiErrorsToForm(e, setError);
    }
  }
  return (
    <ClockeeModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="flex items-center justify-center flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div >
          <h2 className="font-bold text-lg pb-5">Thêm nhãn hàng</h2>
          <div className="flex items-center gap-2">
            <label className="w-24">Tên:</label>
            <input autoFocus={true} className="input input-sm validator flex-1"
              {...register("name", { required: "Tên không được trống" })}
            />
          </div>
          <div className="validator-hint">
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
          </div>

        </div>
        <div className="modal-action">
          <button className="btn bg-primary rounded-lg text-white" onClick={refreshCallBack} style={{ marginRight: "10px" }}>
            Lưu
          </button>
          <button type="submit" className="btn" onClick={onClose}>Hủy</button>
        </div>
      </form>
    </ClockeeModal>
  );
};

export default CreateBrandModal;
