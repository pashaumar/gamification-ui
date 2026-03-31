import React from "react";

import NotificationIcon from "../icons/Notification";

import ProfileImg from "../../../public/profileImage.jpg";

const Header = () => {
  return (
    <div className="w-full flex justify-center items-center h-[64px]">
      <div className="w-[960px] flex justify-between">
        <div className="text-[18px]">Gamification</div>
        <div className="flex gap-2">
          <NotificationIcon />
          <img
            src={ProfileImg}
            alt="Profile"
            className="w-[32px] h-[32px] rounded-[16px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
