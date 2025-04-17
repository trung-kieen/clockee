import React from "react";

export const base64ImageMap = (bytes: string) => {
  return `data:image/png;base64,${bytes}`;
};

type ImageProps = {
  data: string;
  className?: string;
};
const Base64Image = ({ data, className }: ImageProps) => {
  return (
    <>
      <img className={`${className}`} src={base64ImageMap(data)} />
    </>
  );
};

const defaultProductImage = "product1.png";
export const ProductImage = ({ data, className }: { data?: string, className?: string }) => {
  if (data) {
    return <Base64Image data={data} className={`w-96 rounded-lg shadow-md ${className}`} />;
  } else {
    return <img src={defaultProductImage} alt="product image" />;
  }
};
export default Base64Image;
