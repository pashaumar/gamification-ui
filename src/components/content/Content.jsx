import React, { useState } from "react";

// images
import boardImg from "../../../public/board.png";

// static data
import { cardsData } from "./constant";

// components
import RewardModal from "./components/rewardModal/RewardModal";
import { Button } from "@/components/ui/button";

// icons
import GiftIcon from "../icons/Gift";
import CrownIcon from "../icons/Crown";
import IncentivesIcon from "../icons/Incentives";

// constant
const ICON_MAP = {
  gift: <GiftIcon />,
  crown: <CrownIcon />,
  incentives: <IncentivesIcon />,
};

const Content = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (openModal) => {
    setOpenModal(openModal);
  };

  return (
    <div className="w-[960px]">
      <div
        className="w-full h-[322px] bg-cover bg-center flex justify-center relative p-[60px]"
        style={{ backgroundImage: `url(${boardImg})` }}
      >
        <div className="flex flex-col gap-6 items-center ">
          <div className="flex flex-col gap-2">
            <div className="text-[#561056] text-[28px] font-bold text-center">
              Gamify your Campaign
            </div>
            <div className="text-[#616161] w-[354px] text-center">
              Enable gamification to start crafting your custom reward system.
            </div>
          </div>
          <Button
            className="bg-[#C530C5] rounded-[10px] w-[310px] h-[40px] items-center flex cursor-pointer"
            onClick={() => {
              handleOpenModal(true);
            }}
          >
            Enable Gamification
          </Button>
        </div>
        <div className="w-[924px] flex gap-6 absolute bottom-[-130px]">
          {cardsData.map((card) => {
            const { id, title, subtitle } = card;

            return (
              <div
                className="border border-[#FEE7FE] h-[200px] rounded-[8px] flex flex-col items-center justify-center gap-3 bg-white p-4"
                key={id}
              >
                <div className="w-[70px] h-[70px] p-[10px] bg-[#FBCFFB] rounded-[14px] flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-[4px] flex items-center justify-center">
                    {ICON_MAP[id]}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-[#303030] font-medium text-center text-[16px]">
                    {title}
                  </div>
                  <div className="text-[#616161] text-[14px] text-center">
                    {subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {openModal && <RewardModal handleOpenModal={handleOpenModal} />}
    </div>
  );
};

export default Content;
