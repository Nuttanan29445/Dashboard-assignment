import useSort from "../hooks/use-sort";
import { Config, IUser } from "../types/user";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import Modal from "./Modal";
import UserProfile from "./UserProfile";

interface CardProp {
  data: IUser[];
  config: Config<IUser>[];
  keyFn: (data: IUser) => number;
  DropdownsortBy: string;
  DropdownsortOrder: string;
}

const CardUser = ({
  data,
  config,
  keyFn,
  DropdownsortBy,
  DropdownsortOrder,
}: CardProp) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<IUser | null>(null);

  const { sortedData } = useSort(
    data,
    config,
    DropdownsortBy,
    DropdownsortOrder
  );

  const handleClick = (data: IUser) => {
    setSelectedData(data);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setSelectedData(null);
  };

  const renderedCarded = sortedData.map((data, id) => {
    return (
      <div
        className={`flex p-2 rounded-lg shadow-md ${
          id % 2 === 0 ? "bg-[#E1D7C6]" : "bg-[#EAE4DD]"
        }  gap-4 items-center `}
        key={keyFn(data)}
      >
        <img
          src={data.image}
          className="w-20 h-20 rounded-full object-cover"
          alt="user-image"
        />
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-1">
            <div className="font-semibold flex items-center">
              {data.name}
              <div className="text-sm text-[#646a72]">&nbsp;(id:{data.id})</div>
            </div>
            <div className="text-sm  text-[#404449] flex gap-1 items-center">
              <PersonIcon fontSize="small" />
              {data.role}
            </div>
            <div className="text-sm  text-[#404449] flex gap-1 items-center">
              <CalendarMonthIcon fontSize="small" />
              {data.date.toISOString().slice(0, 10)}
            </div>
            <div className="text-sm  text-[#404449] flex gap-1 items-center">
              <EmailIcon fontSize="small" />
              {data.email}
            </div>
          </div>
          <button
            className="p-2 bg-[#295F98] rounded-lg text-white hover:bg-[#18385a] h-fit"
            onClick={() => handleClick(data)}
          >
            See detail
          </button>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="flex flex-col gap-2 ">{renderedCarded}</div>
      {showModal && selectedData && (
        <Modal onClose={handleClose}>
          <div className="flex gap-8">
            <UserProfile data={selectedData} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CardUser;
