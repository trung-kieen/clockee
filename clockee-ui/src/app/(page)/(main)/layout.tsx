import Footer from "@/app/components/footer/footer";
import { MainHeader } from "@/app/components/header/MainHeader";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
