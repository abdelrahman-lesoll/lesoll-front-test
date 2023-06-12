import { useContext } from "react";
import { BsChatDots } from "react-icons/bs";
import { ShowContext } from "../../../App";
import { LangContext } from "../../../Languages/LanguageProvider";
import { useChat } from "../../Hooks/useChat";
import Chat from "./Chat";

const ChatIcon = () => {
  const Context = useContext(ShowContext);
  const Language = useContext(LangContext);
  const { state } = useChat("my-messages");
  return (
    <span className="fixed-bottom bottom-50 cursor-pointer me-2">
      <span
        className="bg-white rounded-circle position-relative"
        onClick={() => Context.dispatch({ type: "modalChat" })}
      >
        <BsChatDots size="1.8rem" />
        {!state.user?.seen && (
          <span className="position-absolute top--20 right--20 bg-danger text-white px-2 font-14 rounded-circle">
            {state.user?.notSeen}
          </span>
        )}
      </span>
      <Chat {...{ Context, Language }} />
    </span>
  );
};

export default ChatIcon;
