import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import HomeOptions from "./HomeOptions";
import GoodPlaces from "./GoodPlaces";
import HomeImgs from "./HomeImgs";
import HomeSearch from "./HomeSearch";
import MostView from "./MostViewd";

const Home = () => {
  const intl = useIntl();
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "HelmetHomeTitle" })}</title>
        <link rel="canonical" href={location.href} />
        <meta
          name="description"
          content={intl.formatMessage({ id: "HelmetHomeDescription" })}
        />
      </Helmet>
      <main>
        <section className="text-center position-relative d-flex flex-column my-5">
          <HomeImgs />
          <HomeSearch />
        </section>
        <HomeOptions />
        <GoodPlaces />
        <MostView />
      </main>
    </>
  );
};

export default Home;
