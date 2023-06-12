import { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { useChat, useGetChatMessage } from "../../Hooks/useChat";
import { FullLoading } from "../../Shared/Loading";
import AsideChat from "./AsideChat";
import Conversation from "./Conversation";

const Chat = () => {
  const chatContainer = useRef();
  const [conversation, setConversation] = useState(null);
  const { state } = useChat("all-messages");
  useGetChatMessage();
  console.log(state);
  if (state.loading) {
    return <FullLoading />;
  } else
    return (
      <div className="p-5">
        <div className="row">
          <AsideChat
            messages={state.allMessages}
            setConversation={setConversation}
          />
          <div className="col-lg-8">
            <div
              className="border border-radius-5 overflow-auto shadow-sm vh-100"
              ref={chatContainer}
            >
              {!conversation ? (
                <h5 className="mb-0 h-100 d-flex align-items-center justify-content-center">
                  Click To Any User To Start Chat !
                </h5>
              ) : (
                <>
                  <div className="sticky-top border-bottom p-2 d-flex align-items-center bg-white justify-content-between">
                    <div className="user-info">
                      <div className="font-14">
                        {conversation.sender.fullname}
                      </div>
                      <div>
                        <GoPrimitiveDot
                          className="text-success"
                          size="1.1rem"
                        />
                        <span className="text-muted font-13">
                          {conversation.sender.isOnline ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>
                    <BsThreeDots className="cursor-pointer" size="1.2rem" />
                  </div>
                  <Conversation
                    chatContainer={chatContainer}
                    messages={conversation.messages}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Chat;
