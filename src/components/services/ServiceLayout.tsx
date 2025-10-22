import { HeaderLayout } from "../../layout/Header/Header";
import { FooterLayout } from "../../layout/Footer/Footer";

export function ServiceLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <HeaderLayout />
      {children} 
      <FooterLayout />
    </>
  );
}
