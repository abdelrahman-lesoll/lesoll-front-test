const BreadCrumb = ({ title }) => {
  return (
    <div className="bg-bread-crumb text-white">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="title px-3">
          <h1 className="font-80 mb-0">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
