export const initialState = {
  // for admins
  notSeenMessages: [],
  conversations: [],
  // for user
  notSeenMsg: 0,
  // Did Admin See the whole messages from user ?
  adminNotSeen: false,
  conversation: "",
  // both user and admin
  messages: [],
  isLoaded: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    // for admins
    case "isLoaded":
      return {
        ...state,
        isLoaded: !state.isLoaded,
        notSeenMsg: 0,
      };
    case "notSeenMsgs":
      return {
        ...state,
        notSeenMessages: [...state.notSeenMessages, action.payload],
      };
    case "conversations":
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    case "convIndex":
      const index = state.conversations.findIndex(
        (conv) => conv.sender._id === action.payload.sender
      );
      let newMessages;
      if (index !== -1) {
        newMessages = state.messages[index];
        newMessages.push({
          _id: action.payload._id,
          text: action.payload.text,
          createdAt: action.payload.createdAt,
          sender: {
            fullname: state.conversations[index].sender.fullname,
            image: state.conversations[index].sender.image,
          },
        });
      }
      return {
        ...state,
        ...(index === -1
          ? {
              conversations: [
                {
                  createdAt: action.payload.conversation.createdAt,
                  updatedAt: action.payload.conversation.updatedAt,
                  _id: action.payload.conversation._id,
                  sender: action.payload.conversation.sender,
                },
                ...state.conversations,
              ],
              messages: [
                [
                  {
                    _id: action.payload._id,
                    text: action.payload.text,
                    sender: action.payload.conversation.sender,
                    createdAt: action.payload.createdAt,
                  },
                ],
                ...state.messages,
              ],
              notSeenMessages: [1, ...state.notSeenMessages],
            }
          : {
              notSeenMessages: [
                ...state.notSeenMessages.slice(0, index),
                state.notSeenMessages[index] + 1,
                ...state.notSeenMessages.slice(
                  index + 1,
                  state.notSeenMessages.length
                ),
              ],
              messages: [
                ...state.messages.slice(0, index),
                newMessages,
                ...state.messages.slice(index + 1, state.messages.length),
              ],
            }),
      };
    case "clientClick":
      return {
        ...state,
        notSeenMessages: [
          ...state.notSeenMessages.slice(0, action.payload),
          0,
          ...state.notSeenMessages.slice(
            action.payload + 1,
            state.notSeenMessages.length
          ),
        ],
      };
    case "addMsgByAdmin":
      let messageIndex = state.messages[action.index];
      messageIndex.push(action.payload);
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, action.index),
          messageIndex,
          ...state.messages.slice(action.index + 1, state.messages.length),
        ],
      };
    // for user
    case "userMsgs":
      return {
        ...state,
        messages: action.payload,
      };
    case "userConversation":
      return {
        ...state,
        conversation: action.payload,
      };
    case "userNotSeen":
      return {
        ...state,
        notSeenMsg: action.payload,
      };
    // if offcanvas chat for client is Turned Off Then messages will increased by 1
    case "incUserNotSeen":
      return {
        ...state,
        notSeenMsg: state.notSeenMsg + 1,
      };
    case "adminNotSeen":
      return {
        ...state,
        adminNotSeen: action.payload,
      };
    // for both
    case "messages":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};
