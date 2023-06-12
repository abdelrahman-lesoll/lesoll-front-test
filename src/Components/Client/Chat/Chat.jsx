import { useRef } from "react";
import { Offcanvas } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import ChatBody from "./ChatBody";

const Chat = ({ Context, Language }) => {
  const chatContainerRef = useRef();
  return (
    <Offcanvas
      show={Context.state.modalChat}
      onHide={() => Context.dispatch({ type: "modalChat" })}
      placement={Language.locale === "en-US" ? "start" : "end"}
    >
      <Offcanvas.Body className="p-0 m-0" ref={chatContainerRef}>
        <div className="border-bottom sticky-top bg-white overflow-hidden px-0 mx-0">
          <Offcanvas.Header closeButton className="px-1">
            <Offcanvas.Title>
              <div className="d-flex align-items-center">
                <img
                  src="/Logo/header-title.jpg"
                  className="mw-100 rounded-circle"
                  height="35"
                  width="35"
                  alt=""
                />
                <h5 className="mb-0">
                  <FormattedMessage id="SupportTeam" />
                </h5>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
        </div>
        <ChatBody chatContainerRef={chatContainerRef} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Chat;
