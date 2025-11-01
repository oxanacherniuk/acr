import { Link, useParams } from "react-router-dom";
import { stockData } from "../../components/Stocks/StockData";
import { HeaderLayout } from "../../layout/Header/Header";
import StockHero from "../../components/Stocks/StockHero";
import StockBenefits from "../../components/Stocks/StockBenefits";
import StockFeatures from "../../components/Stocks/StockFeatures";
import StockFinalCta from "../../components/Stocks/StockFinalCta";
import Footer from "../../layout/Footer/Footer";

import "./scss/style.scss";

export default function StockPage() {
  const { url } = useParams<{ url: string }>();
  const stock = stockData.find((dev) => dev.url === url);
  if (!stock) {
    return (
      <div>
        <div className="container">
          <h1>Акция не найдена</h1>
          <Link to="/developers">Вернуться к списку акций</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderLayout />
      <div className="StockPage">
        <StockHero title={stock.title} data={stock.hero} />
        {stock.benefits && <StockBenefits data={stock.benefits} />}
        {stock.features && <StockFeatures data={stock.features} />}
        {stock.finalCta && <StockFinalCta data={stock.finalCta} />}
      </div>
      <Footer/>
    </>
  );
}
