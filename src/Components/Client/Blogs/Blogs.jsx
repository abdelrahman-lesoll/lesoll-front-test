import { FormattedMessage, useIntl } from "react-intl";
import { useBlogs } from "../../Hooks/useBlog";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Empty, FullLoading } from "../../Shared/Loading";
import BreadCrumb from "../../Shared/BreadCrumb";
import Image from "../../Shared/Image";

const Blogs = () => {
  const { state } = useBlogs("all-blogs");
  const intl = useIntl();
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "HelmetBlogs" })}</title>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <BreadCrumb title={<FormattedMessage id="Blogs" />} />
      <div className="container-fluid">
        {state.loading ? (
          <FullLoading />
        ) : (
          <div className="row my-5">
            {!state.blogs.length ? (
              <Empty title={<FormattedMessage id="NoBlogs" />} />
            ) : (
              state.blogs.map((blog, i) => (
                <div className="col-md-4 col-sm-6 col-12 mb-3" key={i}>
                  <div className="card w-100 h-100">
                    <Link to={`/Blogs/${blog.slug}`}>
                      <Image
                        imageUrl={blog.image}
                        className="card-img-top"
                        height="250"
                        alt=""
                      />
                      <div className="card-body">
                        <h5 className="card-title">{blog.title.ar}</h5>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
