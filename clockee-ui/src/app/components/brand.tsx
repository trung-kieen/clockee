import React from "react";


// Show with app name
const Brand = () => {
  return (
    <>
      {/* Alternative use text and app favicon
      <div className="bg-yellow-400 p-2 rounded-full">
        <span className="text-white font-bold text-lg">
          <Image src={logo} alt="C" width={20} height={20} />
        </span>
      </div>
      <span className="text-yellow-500 text-xl font-bold">Clockee</span>
      */}
      <img src="/logo_header.png" alt="C" className="min-w-40"/>
    </>
  );
};

export default Brand;
