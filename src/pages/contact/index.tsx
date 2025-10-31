import Footer from "../../layout/Footer/Footer";
import { ContactSection } from "../../layout/FosForm";
import { HeaderLayout } from "../../layout/Header/Header";

import "./css/style.css";
export default function Contact() {
  return (
    <>
      <div className="ContactPage">
        <HeaderLayout />
          <ContactSection/>
        <Footer/>
      </div>
    </>
  );
}
