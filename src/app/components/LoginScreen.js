"use client";
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [isInvalidReset, setIsInvalidReset] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    setIsInvalidCredentials(false);

    if (username && password) {
      signInWithEmailAndPassword(auth, username, password)
        .then(() => {
          onLogin();
        })
        .catch((error) => {
          setIsInvalidCredentials(true);
          console.log(error.message);
        });
    } else {
      setIsInvalidCredentials(true);
    }
  };

  const handlePasswordReset = () => {
    setIsInvalidReset(false);
    if (username) {
      sendPasswordResetEmail(auth, username)
        .then(() => {
          toast.success("Password reset email sent!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      setIsInvalidReset(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-rapdev-green rounded-lg p-10 pb-15 shadow-2xl">
        <h1 className="text-3xl text-white font-bold mb-4">Please Log In</h1>
        <div className="bg-rapdev-cyan rounded p-8 h-[90%] w-[80%]">
          <input
            type="text"
            placeholder="Email Address"
            value={username}
            onChange={handleUsernameChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 text-gray-900 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 mb-4 border border-gray-300 text-gray-900 rounded"
          />
          {isInvalidCredentials && (
            <p className="text-lato text-red-500 mb-4">
              Invalid credentials. Please try again.
            </p>
          )}
          {isInvalidReset && (
            <p className="text-lato text-red-500 mb-4">
              Please provide your email to reset
            </p>
          )}
          <div className="flex justify-between items-center mt-5">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded font-bold"
              onClick={handleLogin}
            >
              Login
            </button>
            <a
              href="#"
              className="text-white text-xs font-bold hover:text-green-400"
              onClick={handlePasswordReset}
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
