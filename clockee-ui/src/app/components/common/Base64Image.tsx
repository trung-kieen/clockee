import React from "react";
const Base64Image = ({ data }: { data: string }) => {
  return (
    <>
      <img src={`data:image/png;base64,${data}`} />
    </>
  );
};

export default Base64Image;
