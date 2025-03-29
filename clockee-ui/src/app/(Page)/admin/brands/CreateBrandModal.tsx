import ClockeeModal from "@/app/components/modal/Modal";
import ErrorText from "@/app/components/typography/ErrorText";
import { BrandControllerService, BrandDTO } from "@/gen";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"
const CreateBrandModal = ({ isOpen, onClose, refreshCallBack }: {
  isOpen: boolean,
  onClose: () => void,
  refreshCallBack: () => void,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BrandDTO>()
  const onSubmit: SubmitHandler<BrandDTO> = (data) => {
    BrandControllerService.addBrand(data);
    onClose();
    refreshCallBack();
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
            <input className="input input-sm validator flex-1" {...register("name", { required: "Tên không được trống" })} />
          </div>
          <p className="validator-hint">
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          </p>

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
