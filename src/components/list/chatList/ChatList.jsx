import React, { useState } from "react";
import AddUser from "./addUser/AddUser";
import "./chatList.css";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      <div
        className="item"
        style={{
          backgroundColor: chats?.isSeen ? "transparent" : "#5183fe",
        }}
      >
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span> User</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
            dignissimos numquam vero voluptatibus. Magni, officiis aperiam
            magnam est laboriosam nulla quod cum praesentium nam? Quo asperiores
            molestias eligendi sed nam.
          </p>
        </div>
      </div>

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
