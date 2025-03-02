export const Footer = () => {
  return (
    <div className={"bottom-0 w-full p-6 grid sm:grid-cols-3 md:grid-cols-5 text-sm bg-[#D9D9D9]-800 text-black-300 content-evenly justify-center"}>
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
