import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IUser } from "../types/user";
import { ReactNode } from "react";

interface userProfileProps {
  data: IUser;
}

const UserProfile = ({ data }: userProfileProps) => {
  const { image, name, role, aboutMe, tel, address, email, skills } = data;
  return (
    <div>
      <div className="flex flex-col items-center bg-white rounded-lg  w-full">
        <img
          src={image}
          alt="User Profile"
          className="w-full rounded-lg h-60  md:h-72 object-cover"
        />
        <div className="mt-4 text-xl font-bold">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
        <div className="text-center mt-2 text-gray-600 mb-2 max-w-md">
          {aboutMe}
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-2">
        <Detail>
          <CallIcon fontSize="small" />
          <div>{tel}</div>
        </Detail>

        <Detail>
          <LocationOnIcon fontSize="small" />
          <div>{address}</div>
        </Detail>

        <Detail>
          <EmailIcon fontSize="small" />
          <div>{email}</div>
        </Detail>

        <Detail className="pb-1">
          <div>Skills:</div>
          <div className="flex gap-1 flex-wrap">
            {skills?.map((skill) => {
              return (
                <div
                  className="text-white bg-[#295F98] px-2 rounded-lg"
                  key={skill}
                >
                  {skill}
                </div>
              );
            })}
          </div>
        </Detail>
      </div>
    </div>
  );
};

interface detailProps {
  children: ReactNode;
  className?: string;
}

const Detail = ({ children, className }: detailProps) => {
  return (
    <div
      className={`flex gap-2 border-b-[1px] border-black text-gray-500 items-center text-sm ${className} w-full max-w-md`}
    >
      {children}
    </div>
  );
};

export default UserProfile;
