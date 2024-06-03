import React, { useState } from "react";
import "./addUser.css";
import { toast } from "react-toastify";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const searchUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // const { username } = Object.fromEntries(formData);
    const username = formData.get("username");

    try {
      const citiesRef = collection(db, "users");
      const q = query(citiesRef, where("username", "==", username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // qury filters returns array so just choosing 1st resulted one
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      toast.error("No User FOund ");
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatRef = collection(db, "userchats");

    try {
      // to get the id of the document we need to refer it to collection as document
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          // as serverTimestamp doesnot work with arrayUnion
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          // as serverTimestamp doesnot work with arrayUnion
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wronf");
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={searchUser}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
