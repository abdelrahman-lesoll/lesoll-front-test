import { FormattedMessage } from "react-intl";
import { useBlogs } from "../../Hooks/useBlog";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Empty, HLoading } from "../../Shared/Loading";
import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import BreadCrumb from "../../Shared/BreadCrumb";
import Image from "../../Shared/Image";

const Blogs = () => {
  const { state } = useBlogs("single-blog", useParams().title);
  const { locale } = useContext(LangContext);
  if (state.loading) {
    return <HLoading />;
  } else
    return (
      <>
        <Helmet>
          <title>{state.singleBlog?.title?.ar}</title>
          <meta
            name="description"
            content={
              locale === "en-US"
                ? state.singleBlog?.metaDescription.en
                : state.singleBlog?.metaDescription.ar
            }
          />
          <link rel="canonical" href={location.href} />
          <meta property="og:title" content={state.singleBlog?.title?.ar} />
          <meta
            property="og:description"
            content={
              locale === "en-US"
                ? state.singleBlog?.metaDescription.en
                : state.singleBlog?.metaDescription.ar
            }
          />
        </Helmet>
        <BreadCrumb title={<FormattedMessage id="BlogDetail" />} />
        <div className="container-fluid my-5">
          {!state.singleBlog ? (
            <Empty title={<FormattedMessage id="NoBlogs" />} />
          ) : (
            <div className="row">
              <div className="col-lg-8">
                <Image
                  imageUrl={state.singleBlog.image}
                  className="img-fluid border-radius-5"
                  alt={
                    state.singleBlog?.title[locale === "en-US" ? "en" : "ar"]
                  }
                />
                <h5 className="card-title my-3 ">
                  {state.singleBlog.title.ar}
                </h5>
                <p
                  className="text-justify"
                  dangerouslySetInnerHTML={{
                    __html: state.singleBlog.description.ar,
                  }}
                ></p>
              </div>
            </div>
          )}
        </div>
      </>
    );
};

export default Blogs;
