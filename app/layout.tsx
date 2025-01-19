export const metadata = {
  title: "Todo App",
};
import Image from "next/image";
import Logo from "../assets/layer_1.png";
import "./global.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="flex items-center justify-between">
            <div className="w-full bg-black h-[200px] flex items-center flex-col ">
              <div className="flex flex-row pt-[72px]">
                <Image src={Logo} alt="logo" width="36" height="30" />
                <h1 className="text-[40px] font-black">
                  <span className="text-[#4EA8DE] pr-2">Todo</span>
                  <span className="text-[#5E60CE]">App</span>
                </h1>
              </div>
            </div>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
