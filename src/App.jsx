import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

import "./index.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { Riple } from "react-loading-indicators";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserData } = useUserStore();

  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserData(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserData]);

  if (isLoading)
    return (
      <div className="loading">
        <Riple color="blue" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
