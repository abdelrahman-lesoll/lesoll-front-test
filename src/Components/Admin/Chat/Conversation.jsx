import { useEffect, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ReactTimeAgo from "react-time-ago";

const Conversation = ({ chatContainer, messages }) => {
  const chatRef = useRef();
  useEffect(() => {
    if (messages.length > 1) {
      chatContainer.current.scroll({
        top: chatRef.current.offsetHeight,
        left: 0,
      });
    }
  }, [messages]);
  return (
    <>
      <ul className="list-unstyled m-3 min-vh-100" ref={chatRef}>
        {messages.map((i) => (
          <li
            className={`d-flex flex-column ${i % 2 === 1 && "align-items-end"}`}
            key={i}
          >
            <div className="d-flex align-items-center">
              <img
                height="35"
                width="35"
                className="rounded-circle"
                src="https://yt3.ggpht.com/ytc/AL5GRJWzzsIZaVARmwTYY1ylCvgniDMPcbO4pwGS7sDj=s48-c-k-c0x00ffffff-no-rj"
                alt=""
              />
              <div>
                <div className="mx-2 font-15 text-end">You</div>
                <div className="mx-2 text-muted font-13 text-end">
                  <ReactTimeAgo date={new Date()} />
                </div>
              </div>
            </div>
            <p
              className={`w-75 lh-base text-white p-2 font-15 border-radius-10 my-1 ${
                i % 2 === 1 ? "main-bg" : "bg-icon"
              }`}
            >
              {messages.text}
            </p>
          </li>
        ))}
      </ul>
      <div className="position-sticky bg-white bottom-0 py-2">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex justify-content-between border-top p-2">
            <input placeholder="Message" className="w-100 border-0 outline-0" />
            <button
              type="submit"
              // onClick={() => setMessages(messages + 1)}
              className="outline-0 border-0 bg-transparent"
            >
              <AiOutlineSend className="text-primary" size="1.2rem" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Conversation;
