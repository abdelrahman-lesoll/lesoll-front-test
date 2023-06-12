import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { Empty, HLoading } from "../../Shared/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useFind, useToggleOptions } from "../../Hooks/useUser";
import Image from "../../Shared/Image";
import Confirmation from "../../Modals/Confirmation";

const BookMarks = () => {
  const intl = useIntl();
  const [confirmation, setConfirmation] = useState(false);
  const { state } = useFind("favourites");
  const { handleToggleOption } = useToggleOptions();
  return (
    <>
      <Helmet>
        <link rel="canonical" href={location.href} />
      </Helmet>
      <div className="col-lg-9">
        <div className="title border-bottom mb-3">
          <h3 className="fw-semi-bold">
            <FormattedMessage id="Favourites" />
          </h3>
        </div>
        {state.loading ? (
          <HLoading />
        ) : state.favourites.length === 0 ? (
          <Empty title={<FormattedMessage id="NoFavourites" />} />
        ) : (
          state.favourites.map((realty) => (
            <div className="border-bottom my-1" key={realty._id}>
              <div className="row my-2">
                <div className="col-md-3 align-self-center d-none d-xxl-block d-xl-block d-lg-block d-md-block">
                  <div className="img-container">
                    <Image
                      imageUrl={realty.album[0].image}
                      height="150"
                      className="mw-100 w-100 m-auto border-radius-5 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="col-md-7 col-9">
                  <Link to={`/Detail/${realty._id}`}>
                    <h5 className="fw-semibold text-icon">{realty.title}</h5>
                    <p className="text-dark-grey font-14 mb-0">
                      {realty.address.name}
                    </p>
                    <div className="my-2">
                      <span className="bg-light-grey main-text fw-semibold px-3 border-radius-5 font-14">
                        <FormattedNumber value={realty.price} />
                        <FormattedMessage id="LE" />
                        {realty.offer === "For Rent" &&
                          `/ ${intl.formatMessage({
                            id: realty.rentalPeriod,
                          })}`}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="col-2 align-self-center">
                  <div
                    onClick={() => setConfirmation(true)}
                    className="d-flex align-items-center justify-content-end text-danger cursor-pointer"
                  >
                    <FiTrash size={"1.3rem"} />
                    <span className="mx-2">
                      <FormattedMessage id="Delete" />
                    </span>
                  </div>
                  <Confirmation
                    {...{ confirmation, setConfirmation }}
                    execute={() =>
                      handleToggleOption({ id: realty._id, key: "favourite" })
                    }
                    messageBody={<FormattedMessage id="DeleteFromFavourite" />}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BookMarks;
