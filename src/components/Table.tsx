import { IUser, Config } from "../types/user";
import { Fragment, useState } from "react";
import Modal from "./Modal";
import UserProfile from "./UserProfile";

interface TableProp {
  datas: IUser[];
  config: Config<IUser>[];
  keyFn: (data: IUser) => number;
}

const Table = ({ datas, config, keyFn }: TableProp) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState<IUser | null>(null);

  const handleClick = (data: IUser) => {
    setSelectedData(data);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedData(null);
  };

  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return (
      <th key={column.label}>
        <div className="ml-2 py-3 flex items-center font-bold text-sm  text-[#989fa5]">
          {column.label}
        </div>
      </th>
    );
  });

  const renderedRows = datas.map((data, index) => {
    const renderedCells = config.map((column) => {
      return (
        <td
          key={column.label}
          className="p-2 font-semibold text-[#000000ad] max-w-44 break-words"
        >
          {column.render(data)}
        </td>
      );
    });
    return (
      <tr
        key={keyFn(data)}
        className={`border-b ${
          index % 2 === 0 ? "bg-[#E1D7C6]" : "bg-[#EAE4DD]"
        }`}
      >
        {renderedCells}
        <td className="p-2">
          <button
            className="p-2 bg-[#295F98] rounded-lg text-white hover:bg-[#18385a]"
            onClick={() => handleClick(data)}
          >
            See detail
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <table className="table-auto border-spacing-2 w-full">
        <thead>
          <tr className="border-y-2 border-b-[#CDC2A5]">{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>

      {showModal && selectedData && (
        <Modal onClose={handleClose}>
          <div className="flex gap-8">
            <UserProfile data={selectedData} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Table;
