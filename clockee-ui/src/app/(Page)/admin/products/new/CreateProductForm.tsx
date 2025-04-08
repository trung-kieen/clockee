"use client";
import ErrorText from "@/app/components/typography/ErrorText";
import { AdminBrandControllerService, AdminProductControllerService, AdminProductRequest } from "@/gen";
import { ProductService } from "@/service/ProductService";
import { mapApiErrorsToForm } from "@/utils/form";
import { useEffect, useState } from "react";
import { Controller, ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import Select from 'react-select';
import { toast } from "react-toastify";


const aquaticCreatures = [
  { label: 'Shark', value: 1 },
  { label: 'Dolphin', value: 2 },
  { label: 'Whale', value: 3 },
  { label: 'Octopus', value: 4 },
  { label: 'Crab', value: 5 },
  { label: 'Lobster', value: 6 },
];

type SelectOption = {
  label: string;
  value: number;
};

type CreateProductWithImage = AdminProductRequest & {
  image: FileList,
}


const CreateProductForm = () => {
  const [brandOptions, setBrandOptions] = useState<Array<SelectOption>>([]);

  const {
    register,
    control,
    reset,
    setFocus,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductWithImage>();

  const fetchBrands = async () => {

    try {
      const pageResults = await AdminBrandControllerService.getAllBrands();
      const newOptions = pageResults.content?.map((brand) => {
        const brandOptions: SelectOption = { label: String(brand.name), value: Number(brand.brandId) };
        return brandOptions;
      })
      setBrandOptions(newOptions || []);
    } catch (e) {
      setBrandOptions(aquaticCreatures);
      console.log(e);
    }

  }
  useEffect(() => {

    fetchBrands();
  }, [])




  const onSubmit: SubmitHandler<CreateProductWithImage> = async (data: CreateProductWithImage) => {
    console.log(data);
    try {
      // Create product with data content
      const productNoImg = data as AdminProductRequest;
      const savedProduct = await AdminProductControllerService.createProduct(productNoImg);
      if (!savedProduct.productId) {
        toast("UNABLE_ADD_PRODUCT");
        return;
      }

      await ProductService.uploadProductImage(savedProduct.productId, {
        file: data.image[0]
      })

      // TODO: Partial update image for created project
      toast("Thêm thành công");
      setFocus("name");
      reset();
    } catch (e) {
      mapApiErrorsToForm(e, setError);
    }
  }




  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset w-full p-4 rounded-box space-y-4">

        <div>
          <label className="label">
            <span className="label-text">Tên</span>
          </label>
          <input autoFocus={true} type="text" className="input validator input-bordered w-full" placeholder="Product name"
            {...register("name", { required: "Tên không được trống" })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Mô tả</span>
          </label>
          <textarea className="textarea validator textarea-bordered w-full" placeholder="Product description"
            {...register("description", { required: "Tên không được trống" })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Giá thực tế</span>
          </label>
          <input type="number" className="input input-bordered w-full" placeholder="0.00"
            {...register("actualPrice", {
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Value must be 0 or more",
              },
            })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Giá bán</span>
          </label>
          <input type="number" className="input validator input-bordered w-full" placeholder="0.00"
            {...register("sellPrice", {
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Value must be 0 or more",
              },
            })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Loại</span>
          </label>
          <input type="text" className="input validator input-bordered w-full" placeholder="Optional product type"
            {...register("type", { required: "Tên không được trống" })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Nhãn hiệu</span>
          </label>
          <Controller
            control={control}
            render={function({ field }: { field: ControllerRenderProps<CreateProductWithImage> }): React.ReactElement {

              {/*
                    Use react-hook-form controller as wraper of Select react-select
                    Select make easy to search throw list of brand
                    Return brandId instead of Object SelectOption
              */}
              return (
                <Select
                  className="w-full validator"
                  options={brandOptions}
                  onChange={(option) => { field.onChange(option?.value) }}
                  value={brandOptions.find((opt) => opt.value === field.value)}
                  placeholder="Select brand..."
                />
              )
            }} name={"brandId"} />
        </div>

        <div className="flex items-center space-x-4">
          <label className="label cursor-pointer">
            <span className="label-text">Visible</span>
            <input type="checkbox" className="checkbox"
              {...register("visible")}
            />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">Active</span>
            <input type="checkbox" className="checkbox"
              {...register("active")}
            />
          </label>
        </div>

        <label className="fieldset-label">Image</label>
        <input type="file" className="file-input w-full"
          {...register("image")}
        />


        {/* Validation error message */}
        <div className="flex items-center gap-2">
          <div className="validator-hint">
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            {errors.description && <ErrorText>{errors.description.message}</ErrorText>}
            {errors.actualPrice && <ErrorText>{errors.actualPrice.message}</ErrorText>}
            {errors.sellPrice && <ErrorText>{errors.sellPrice.message}</ErrorText>}
            {errors.type && <ErrorText>{errors.type.message}</ErrorText>}
            {errors.brandId && <ErrorText>{errors.brandId.message}</ErrorText>}
            {errors.visible && <ErrorText>{errors.visible.message}</ErrorText>}
            {errors.active && <ErrorText>{errors.active.message}</ErrorText>}
            {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
          </div>

        </div>



        <div className="text-right">
          <button className="btn btn-primary">Submit</button>
        </div>

      </fieldset>
    </form>

  )
}
export default CreateProductForm;
