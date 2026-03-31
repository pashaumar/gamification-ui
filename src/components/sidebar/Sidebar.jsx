import React from "react";

import { sidebarTopList, sidebarFooterList } from "./constant";

import HomeIcon from "../icons/Home";
import ApplicationsIcon from "../icons/Applications";
import InsightsIcon from "../icons/Insights";
import PaymentsIcon from "../icons/Payments";
import GamificationIcon from "../icons/Gamification";
import ProfileIcon from "../icons/Profile";
import LogoIcon from "../icons/Logo";

const ICON_MAP = {
  home: <HomeIcon />,
  applications: <ApplicationsIcon />,
  insights: <InsightsIcon />,
  payments: <PaymentsIcon />,
  gamification: <GamificationIcon />,
  settings: <ProfileIcon />,
};

const Sidebar = ({ currentTab }) => {
  const getListItems = (itemsList) => {
    return itemsList.map((item) => {
      const { id, label, icon } = item;

      const isActive = currentTab === id;
      return (
        <div
          key={id}
          className={`flex p-2 gap-2 cursor-pointer rounded-[10px] items-center ${isActive ? "bg-white" : ""}`}
        >
          <div>{ICON_MAP[icon]}</div>
          <div className={`${isActive ? "text-[#C530C5]" : "text-[#616161]"}`}>
            {label}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-[188px] p-4 bg-[#FDEFFD] flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div className="flex gap-2 items-center">
          <div>
            <LogoIcon />
          </div>
          <div className="text-[#340634] text-[28px] font-demibold">SaTHI</div>
        </div>
        <div className="flex flex-col gap-1">
          {getListItems(sidebarTopList)}
        </div>
      </div>
      <div>{getListItems(sidebarFooterList)}</div>
    </div>
  );
};

export default Sidebar;
