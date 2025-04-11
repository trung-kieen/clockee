"use client";
import ErrorText from "@/app/components/typography/ErrorText";
import { AdminBrandControllerService, AdminProductControllerService, AdminProductRequest } from "@/gen";
import { ProductService } from "@/service/ProductService";
import { mapApiErrorsToForm } from "@/utils/form";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import Select, { SingleValue } from 'react-select';
import { toast } from "react-toastify";

type SelectOption = {
  label: string;
  value: number;
};

type CreateProductWithImage = AdminProductRequest & {
  image: FileList,
}


const CreateProductForm = () => {
  const [brandOptions, setBrandOptions] = useState<Array<SelectOption>>([]);
  const [brandQuery, setBrandQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const {
    register,
    control,
    reset,
    setFocus,
    getValues,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductWithImage>();

  const fetchBrands = async (query: string) => {
    try {
      const pageResults = await AdminBrandControllerService.getAllBrands(undefined, undefined, query);
      const newOptions = pageResults.content?.map((brand) => {
        const brandOptions: SelectOption = { label: String(brand.name), value: Number(brand.brandId) };
        return brandOptions;
      })
      setBrandOptions(newOptions || []);
    } catch (e) {
      setBrandOptions([]);
      console.log(e);
    }

  }
  useEffect(() => {
    fetchBrands(brandQuery);
  }, [brandQuery])




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


  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || !event.target.files[0]) {
      return
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSelectedFile(reader.result as string);
        }
      }
      reader.readAsDataURL(file);

    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset w-full p-4 rounded-box space-y-4">

        <div>
          <label className="label">
            <span className="label-text">Tên</span>
          </label>
          <input autoFocus={true} type="text" className="input validator input-bordered w-full" placeholder="Nhập tên đầy đủ của sản phẩm"
            {...register("name", { required: "Tên không được trống" })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Mô tả</span>
          </label>
          <textarea
            className="textarea validator textarea-bordered w-full"
            placeholder="Nhập mô tả chi tiết (không bắt buộc)"
            {...register("description", {
              maxLength: {
                value: 500,
                message: "Mô tả không được vượt quá 500 ký tự",
              },
            })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Giá gốc</span>
          </label>
          <input type="number" className="input input-bordered w-full" placeholder="Giá nhập hàng vào"
            {...register("actualPrice", {
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Giá gốc không được âm",
              },
            })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Giá bán</span>
          </label>

          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Nhập giá bán cho khách hàng"
            {...register("sellPrice", {
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Giá bán không được âm",
              },
              validate: (value) =>
                value >= getValues("actualPrice") ||
                "Giá bán phải lớn hơn hoặc bằng giá thành",
            })}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Loại</span>
          </label>
          <input type="text" className="input validator input-bordered w-full" placeholder="Tên phân loại"
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
              function handleBrandQueryChange(newValue: string): void {
                if (newValue != brandQuery) {
                  setBrandQuery(newValue)
                }
              }

              function setInputValueAsSelectValue(newOption: SingleValue<SelectOption>): void {
                field.onChange(newOption?.value);
              }

              return (
                <Select
                  className="w-full validator"
                  options={brandOptions}
                  onInputChange={handleBrandQueryChange}
                  onChange={setInputValueAsSelectValue}
                  value={brandOptions.find((opt) => opt.value === field.value)}
                  placeholder="Chọn thương hiệu..."
                  // Fix hydration mismatch
                  instanceId="brand-select"
                />
              )
            }} name={"brandId"} />
        </div>

        <div className="flex items-center space-x-4">
          <label className="label cursor-pointer">
            <span className="label-text">Hiển thị với khách hàng</span>
            <input type="checkbox" className="checkbox"
              {...register("visible")}
            />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">Đang kinh doanh</span>
            <input type="checkbox" className="checkbox"
              {...register("active")}
            />
          </label>
        </div>

        <label className="fieldset-label">Ảnh minh họa</label>

        { // Preview product image
          selectedFile && (
            <div>
              <img
                src={selectedFile}
                alt="Preview"
                className="rounded-md"
                width={400}
                height={400}
              />
            </div>
          )
        }

        <input
          type="file"
          className="file-input w-full"
          {...register("image", {
            validate: {
              fileType: (files) => {
                const file = files?.[0];
                if (!file) return true;
                const allowedTypes = ["image/jpeg", "image/png"];
                return allowedTypes.includes(file.type) || "Chỉ chấp nhận ảnh JPEG/PNG";
              },
              fileSize: (files) => {
                const file = files?.[0];
                if (!file) return true;
                return file.size < 2 * 1024 * 1024 || "Kích thước ảnh phải nhỏ hơn 2MB";
              },
            },
            onChange: handleFileChange,
          })}
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
          <button className="btn btn-primary">Lưu</button>
        </div>

      </fieldset>
    </form>

  )
}
export default CreateProductForm;
