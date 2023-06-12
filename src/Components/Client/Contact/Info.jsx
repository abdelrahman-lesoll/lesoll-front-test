import { AiOutlineMail } from "react-icons/ai";
import { FormattedMessage } from "react-intl";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";

const Info = () => {
  return (
    <div className="col-lg-4 contact-details">
      <div className="p-2">
        <div className="title">
          <h3 className="fw-semibold">
            <span className="border-bottom">
              <FormattedMessage id="FindUsThere" />
            </span>
          </h3>
        </div>
        <div className="my-4 contact-detail d-flex flex-column align-content-center justify-content-between">
          <div className="address d-flex mb-4">
            <div>
              <MdOutlineLocationOn size="2.5rem" />
            </div>
            <div className="mx-4">
              <h5 className="mb-1 fw-semibold">
                <FormattedMessage id="Address" />
              </h5>
              <span className="text-muted font-15">
                <FormattedMessage id="LesollAddress" />
              </span>
            </div>
          </div>
          <div className="fax d-flex mb-4">
            <AiOutlineMail size="2.5rem" />
            <div className="mx-4">
              <h5 className="mb-1 fw-semibold">
                <FormattedMessage id="Email" />
              </h5>
              <span className="text-primary text-decoration-underline font-18">
                info@lesoll.com
              </span>
            </div>
          </div>
          <div className="fax d-flex mb-4">
            <BsWhatsapp size="2rem" />
            <div className="mx-4">
              <h5 className="mb-1 fw-semibold">
                <FormattedMessage id="Phone" />
              </h5>
              <a
                href="https://wa.me/+201032362898"
                target="blank"
                className="text-primary link-success text-decoration-underline font-18"
              >
                +201032362898
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
