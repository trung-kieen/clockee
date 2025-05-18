export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <nav className="pl-20">
        <h6 className="footer-title">Dịch vụ khách hàng</h6>
        <a className="link link-hover">Trung tâm trợ giúp</a>
        <a className="link link-hover">Hướng dẫn mua hàng</a>
        <a className="link link-hover">Chính sách bảo mật</a>
      </nav>

      <nav className="pl-10">
        <h6 className="footer-title">Clockee Việt Nam</h6>
        <a className="link link-hover">Về Clockee</a>
        <a className="link link-hover">Tuyển dụng</a>
        <a className="link link-hover">Flash Sale</a>
      </nav>

      <nav className="pl-10">
        <h6 className="footer-title">Thanh toán</h6>
        <a className="link link-hover">💳 VISA</a>
        <a className="link link-hover">🏦 Momo</a>
        <a className="link link-hover">💰 ClockeePay</a>
      </nav>

      <nav className="pl-10">
        <h6 className="footer-title">Tải ứng dụng Clockee</h6>
        <a className="link link-hover">📱 App Store</a>
        <a className="link link-hover">📱 Google Play</a>
      </nav>
    </footer>
  );
}
