import { useEffect, Fragment, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { AiOutlineSend } from "react-icons/ai";
import { useChat, useSendChat } from "../../Hooks/useChat";
import { FullLoading } from "../../Shared/Loading";
import Image from "../../Shared/Image";

const ChatBody = ({ chatContainerRef }) => {
  const { chatRef, inputRef, state, auth, handleAddMsg } = useChat();
  const { setSent, setValues } = useSendChat("msgFromUser");
  const [text, setText] = useState("");

  useEffect(() => {
    if (state.userMessages.length > 1) {
      chatContainerRef.current?.scroll({
        top: chatRef.current?.offsetHeight,
        left: 0,
      });
    }
  }, [state.userMessages]);
  if (state.loading) {
    return <FullLoading />;
  } else {
    return (
      <Fragment>
        <ul className="list-unstyled p-2 min-vh-100" ref={chatRef}>
          {state.userMessages.map((message, i) => (
            <li className="mb-3" key={i}>
              <div
                className={`d-flex ${
                  !i || auth.user._id !== message.sender._id
                    ? "flex-row"
                    : "flex-row-reverse"
                }`}
              >
                {!i ? (
                  <img
                    src="/Logo/header-title.jpg"
                    className="mw-100 rounded-circle"
                    height="35"
                    width="35"
                    alt=""
                  />
                ) : (
                  <Image
                    imageUrl={message.sender.image}
                    className="mw-100 rounded-circle"
                    height="35"
                    width="35"
                    alt=""
                  />
                )}
                <div className="w-75 mx-2 font-15">
                  <p
                    className={`text-white border-radius-10 p-2 mb-0 ${
                      !i || auth.user._id !== message.sender._id
                        ? "main-bg"
                        : "bg-orange"
                    }`}
                  >
                    {!i ? (
                      <FormattedMessage id="WelcomeChatMessage" />
                    ) : (
                      message.text
                    )}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="position-sticky bottom-0 overflow-hidden border-top bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const { conversation } = state;
              const { user } = auth;
              if (!!text) {
                handleAddMsg({ conversation, text }, user);
                setText("");
                setSent(true);
                setValues({ user, conversation, text });
              }
            }}
          >
            <div className="d-flex align-items-center justify-content-between p-2">
              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="outline-0 border-0 width-95"
                placeholder={useIntl().formatMessage({ id: "Message" })}
              />
              <button
                type="submit"
                className="outline-0 bg-transparent border-0 width-5"
              >
                <AiOutlineSend className="text-primary" />
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
};

export default ChatBody;
