import React, { useState } from "react";
import { auth, db, storage } from "../../lib/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import "./login.css";
import { upload } from "../../lib/upload.js";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);

    try {
      setLoading(true);

       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // const username = formData.username;
    // const email = formData.email;
    // const password = formData.password;

    // desturcuting

    const { username, email, password } = Object.fromEntries(formData);

    // console.log(username, email, password);

    const imgUrl = await upload(avatar.file);

    try {
      setLoading(true);

      const res = await createUserWithEmailAndPassword(auth, email, password);

      // console.log(res);

      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      setLoading(false);

      toast.success("Account has been created! You can login now.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>
            {loading ? "Processing" : "Sign"} In
          </button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>
            {loading ? "Processing" : "Sign"} Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
