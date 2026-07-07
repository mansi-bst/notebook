import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURLS } from "./../BaseUrls";
import { errorEmitter, successEmitter } from "../Toastify.Emmiter";

export const authContext = createContext(null);

function AuthState({ children }) {
  const [loader, setLoader] = useState(false);
  const [checker, setChecker] = useState(false);
  const [open, setOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") || false,
  );
  const [profile, setProfile] = useState(null);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const signupFunc = async (signUser, setSignUser) => {
    setLoader(true);
    try {
      const res = await fetch(`${BASEURLS}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUser),
      });

      const data = await res.json();

      if (data.success) {
        setSignUser({ name: "", email: "", password: "" });
        successEmitter(data.message);
        navigate("/login");
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const loginFunc = async (loginUser, setLoginUser) => {
    setLoader(true);
    try {
      const res = await fetch(`${BASEURLS}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsLogin(true);
        setLoginUser({ email: "", password: "" });
        successEmitter(data.message);
        await getProfileFunc();
        navigate("/");
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const logoutFunc = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setProfile(null);
    successEmitter("Logout Successfully");
    navigate("/login");
  };
  const getProfileFunc = async () => {
    setChecker(true);
    try {

      const res = await fetch(`${BASEURLS}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'token': localStorage.getItem("token"),
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setChecker(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogin(true);
      getProfileFunc();
    }
  }, []);
  return (
    <authContext.Provider
      value={{
        open, setOpen,
        loader,
        setLoader,
        signupFunc,
        loginFunc,
        isLogin,
        profile,
        getProfileFunc,
        user,
        logoutFunc,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthState;

export const useAuthState = () => useContext(authContext);
