import { AiOutlineSearch } from "react-icons/ai";
import ReactTimeAgo from "react-time-ago";
import Image from "../../Shared/Image";

const AsideChat = ({ messages, setConversation }) => {
  return (
    <div className="col-lg-4">
      <div className="border border-radius-5 overflow-auto shadow-sm vh-100">
        <div className="border-bottom p-2 d-flex align-items-center bg-white justify-content-between position-sticky top-0">
          <input
            type="text"
            placeholder="Search Client"
            className="width-90 outline-0 border-0"
          />
          <AiOutlineSearch className="text-icon width-10" size="1.2rem" />
        </div>
        <ul className="list-unstyled m-2">
          {messages.map((message, i) => (
            <li
              key={i}
              className="d-flex align-items-center justify-content-between mb-2 cursor-pointer bg-light-grey-hover p-2 border-radius-5"
              onClick={() => setConversation(message)}
            >
              <div className="d-flex align-items-center">
                <Image
                  imageUrl={message.sender.image}
                  height="45"
                  width="45"
                  className="rounded-circle"
                />
                <div className="user-name-text mx-2">
                  <div>{message.sender.fullname}</div>
                  <div className="font-14 text-muted">
                    {message.sender.email}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-muted font-14">
                  <ReactTimeAgo date={new Date(message.updatedAt)} />
                </div>
                <div
                  className={`text-muted font-14 text-center ${
                    message.admins.seen && "d-none"
                  }`}
                >
                  <span className="bg-danger text-white px-1 border-radius-5">
                    {message.admins.notSeen}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AsideChat;
