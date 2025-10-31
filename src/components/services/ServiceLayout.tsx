import { HeaderLayout } from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

export function ServiceLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <HeaderLayout />
      {children} 
      <Footer/>
    </>
  );
}
