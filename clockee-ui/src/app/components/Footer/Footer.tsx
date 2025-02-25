export const Footer = () => { 
  return (
    <div className={" absolute bottom-0 w-full p-6 grid grid-cols-5 text-sm bg-[#D9D9D9]-800 text-black-300"}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-semibold">Chính sách chung</h3>
            <p>Giới thiệu về Clockee</p>
            <p>Phản ánh - khiếu nại</p>
            <p>Chứng nhận đại lý</p>
            <p>Top list đồng hồ</p>
            <p>Kiến thức đồng hồ</p>
          </div>
        ))}
      </div>
  )
}