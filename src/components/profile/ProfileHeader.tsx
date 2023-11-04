import React from "react";
import Logo from "../Logo";

type ProfileHeaderProps = {
  image: string;
  name: string;
  followers: number;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  image,
  // followers,
}) => {
  return (
    <div className="flex flex-row justify-start bg-black bg-opacity-30 h-320 ">
      <div className="flex flex-row">
        <img src={image} alt={name} className="w-56 h-56 rounded-full" />
        <h1 className="mt-16 ml-6 text-6xl font-bold text-white">{name}</h1>
        <div>
          {/* <div className="mt-2 ml-4 text-2xl text-white">{followers}</div> */}
        </div>
      </div>
      <div className="flex items-start justify-end flex-1">
        {" "}
        <Logo />
      </div>
    </div>
  );
};
