import { Accordion } from "react-bootstrap";
import { Fragment, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Empty, HLoading } from "../../Shared/Loading";
import { LangContext } from "../../../Languages/LanguageProvider";
import Image from "../../Shared/Image";

const Q_A_Info = ({ state }) => {
  const { locale } = useContext(LangContext);
  return (
    <Fragment>
      {state.loading ? (
        <HLoading />
      ) : state.faqs.length === 0 ? (
        <div className="text-center">
          <Empty title={<FormattedMessage id="NoFaqs" />} />
        </div>
      ) : (
        <Accordion>
          {state.faqs.map((info, index) => (
            <Accordion.Item
              eventKey={index}
              className={`${
                index !== 0 ? "my-4" : "mb-4"
              } border border-radius-5`}
              key={index}
            >
              <Accordion.Header>
                {locale === "en-US" ? info.question.en : info.question.ar}
              </Accordion.Header>
              <Accordion.Body className="text-dark-grey fw-normal">
                {info.answers.map((answer) => (
                  <div className="mb-1" key={answer._id}>
                    {locale === "en-US" ? answer.en : answer.ar}
                  </div>
                ))}
              </Accordion.Body>
              {info.video && (
                <Accordion.Body>
                  <Image
                    imageUrl={info.video}
                    isVideo={true}
                    controls
                    className="w-100"
                    height="300"
                  />
                </Accordion.Body>
              )}
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Fragment>
  );
};

export default Q_A_Info;
