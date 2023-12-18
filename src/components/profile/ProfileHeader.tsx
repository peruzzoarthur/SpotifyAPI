import React from "react";
import Logo from "../Logo";
import placeholderImage from "@/styles/img/profilePlaceholder.jpg";

type ProfileHeaderProps = {
  image: string | undefined;
  name: string | undefined;
  followers: number | undefined;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  image,
  // followers,
}) => {
  return (
    <>
      <div className="flex flex-col pt-2 pb-2 bg-black bg-opacity-10">
        <Logo />
        <div className="flex flex-row">
          {!image ? (
            <img
              src={placeholderImage}
              alt={name}
              className="w-56 h-56 ml-4 rounded-full opacity-80"
            />
          ) : (
            <img
              src={image}
              alt={name}
              className="w-56 h-56 ml-4 rounded-full"
            />
          )}
          {/* {image === undefined && (
            <img
              src={placeholderImage}
              alt={name}
              className="w-56 h-56 ml-4 rounded-full"
            />
          )} */}
          {/* {image !== undefined && (
            <img
              src={image}
              alt={name}
              className="w-56 h-56 ml-4 rounded-full"
            />
          )} */}
          <h1 className="mt-16 ml-6 text-6xl font-bold text-white">{name}</h1>
          <div>
            {/* <div className="mt-2 ml-4 text-2xl text-white">{followers}</div> */}
          </div>
        </div>
        <div className="flex items-start justify-end flex-1"> </div>
      </div>
    </>
  );
};
