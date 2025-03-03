export default function Footer () {
  return(
    <footer className="w-full bg-white py-6 px-10 text-sm text-gray-500">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-semibold text-gray-800">Dịch vụ khách hàng</h3>
          <ul className="mt-2 space-y-1">
            <li>Trung tâm trợ giúp</li>
            <li>Hướng dẫn mua hàng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Clockee Việt Nam</h3>
          <ul className="mt-2 space-y-1">
            <li>Về Clockee</li>
            <li>Tuyển dụng</li>
            <li>Flash Sale</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Thanh toán</h3>
          <ul className="mt-2 flex gap-2">
            <li>💳 VISA</li>
            <li>🏦 Momo</li>
            <li>💰 ClockeePay</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Tải ứng dụng Clockee</h3>
          <div className="flex gap-2 mt-2">
            <span>📱 App Store</span>
            <span>📱 Google Play</span>
          </div>
        </div>
      </div>
    </footer>
  );
}