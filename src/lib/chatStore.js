import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    if (user.blocked.includes(currentUser.id)) {
      // check if current user is blocked

      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    } else if (currentUser.blocked.includes(user.id)) {
      // check if receiver is blocked

      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      // if no one blocked no one

      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },

  changeBlock: () => {
    // change block state toggle

    return set((state) => ({
      ...state,
      isReceiverBlocked: !state.isReceiverBlocked,
    }));
  },
}));
