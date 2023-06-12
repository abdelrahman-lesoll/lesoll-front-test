import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import {
  findMyMessages,
  addMessage,
  resetError,
  findAllMessages,
} from "../../Api/Chat";

export const useChat = (key) => {
  const chatRef = useRef();
  const inputRef = useRef(null);
  const auth = useAuth();
  const state = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddMsg = (values, user) => dispatch(addMessage({ user, values }));

  useEffect(() => {
    if (key === "my-messages") {
      dispatch(findMyMessages());
    } else if (key === "all-messages") {
      dispatch(findAllMessages());
    } else {
      return;
    }
  }, [key]);

  // Check For Error
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Chat", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return { state, chatRef, inputRef, auth, handleAddMsg };
};

// message sent from auth User to Admins
export const useSendChat = (emitKey) => {
  const auth = useAuth();
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState(null);
  useEffect(() => {
    if (!!emitKey && sent) {
      auth.socket?.emit(emitKey, values);
      setSent(false);
      setValues(null);
    }
  }, [auth.socket, sent]);
  return { setSent, setValues };
};

export const useGetChatMessage = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.socket?.on("getUserMessage", (data) => {
      console.log(data);
    });
  }, [auth.socket]);
};
