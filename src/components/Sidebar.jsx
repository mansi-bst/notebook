import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import userIcon from "../assets/usericon.png";
import { useAuthState } from "../Contextapi/Authstate";
import { BookHeart, LogOut, Notebook, Settings, UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  const { logoutFunc ,profile } = useAuthState();

  const logoutHandler = () => {
    logoutFunc();
    setOpen(false);
  };
 
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300 }} role="presentation">
          <div className="h-full w-full py-12">
            <div className="flex flex-col items-center">
              <img
                className="h-25 w-25 rounded-full"
                src={userIcon}
                alt="loading..."
              />
              <h1 className="my-3 text-3xl font-bold">{profile?.name}</h1>
              <p>{profile?.email}</p>
            </div>

            <ul className="my-5 leading-10">
              <Link to='/notes'
                className="hover:bg-gray-200 px-5 cursor-pointer flex items-center gap-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                <BookHeart size={"18px"} /> Your notes
              </Link>
              <Link to='/notes'
                className="hover:bg-gray-200 px-5 cursor-pointer flex items-center gap-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                <Notebook size={"18px"} /> Public notes
              </Link>
              <li
                className="hover:bg-gray-200 px-5 cursor-pointer flex items-center gap-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                <UserRoundCog size={"18px"} /> Profile
              </li>
              <li
                className="hover:bg-gray-200 px-5 cursor-pointer flex items-center gap-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                <Settings size={"18px"} /> Setting
              </li>
            </ul>

            <div className="flex justify-center">
              <button
                className="absolute cursor-pointer bottom-5 px-6 py-2 font-semibold rounded dark:bg-rose-600 dark:text-gray-50 flex items-center gap-2"
                onClick={logoutHandler}
              >
                <LogOut size={"20px"} /> Logout
              </button>
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
