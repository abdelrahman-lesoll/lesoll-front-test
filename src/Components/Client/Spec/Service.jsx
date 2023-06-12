import { Accordion } from "react-bootstrap";
import { AiFillCheckCircle } from "react-icons/ai";
import { FormattedMessage } from "react-intl";

const Service = ({ locale, singleRealty }) => {
  return (
    <Accordion className="my-2">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="font-20">
          <FormattedMessage id="OtherFeatures" />
        </Accordion.Header>
        <Accordion.Body>
          <div className="row">
            {singleRealty.service.map((service) => (
              <div className="col-lg-4 col-sm-6 mb-2" key={service._id}>
                <div className="d-flex align-items-center">
                  <AiFillCheckCircle className="text-success" size="1.5rem" />
                  <span className="mx-2 fw-lighter">
                    {" "}
                    {locale === "en-US"
                      ? service.name.en
                      : service.name.ar}{" "}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Service;
