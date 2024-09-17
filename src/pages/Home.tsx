import UseAuthContext from "../hooks/use-auth-context";
import { Config, IUser } from "../types/user";
import SortableTable from "../components/SortableTable";
import Search from "../components/Search";
import { ChangeEventHandler, useState } from "react";
import { dataDashboard } from "../data/dashboard";
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import WelcomeMessage from "../components/WelcomeMessage";
import Navbar from "../components/Navbar";
import CardUser from "../components/CardUser";

interface OptionDropdown {
  label: string;
  value: string;
}

const Home = () => {
  const data: IUser[] = dataDashboard;
  const [isModalWelcome, setIsModalWelcome] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<OptionDropdown | null>({
    label: "Date",
    value: "Date",
  });
  const [sortFrom, setSortFrom] = useState<OptionDropdown | null>({
    label: "Descending",
    value: "desc",
  });
  const { username } = UseAuthContext();

  const handleSortBy = (option: OptionDropdown) => {
    setSortBy(option);
  };

  const handleSortFrom = (option: OptionDropdown) => {
    setSortFrom(option);
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.currentTarget.value);
  };

  const handleModalClose = () => {
    setIsModalWelcome(false);
  };

  const optionsSortBy = [
    { label: "Id", value: "Id" },
    { label: "Date", value: "Date" },
  ];

  const optionsSortFrom = [
    { label: "Descending", value: "desc" },
    { label: "Ascending", value: "asc" },
  ];

  const configTable: Config<IUser>[] = [
    {
      label: "Id",
      render: (user: IUser) => user.id,
      sortValue: (user: IUser) => user.id,
    },
    {
      label: "Name",
      render: (user: IUser) => (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={user.image}
          />
          <div>{user.name}</div>
        </div>
      ),
    },
    {
      label: "Role",
      render: (user: IUser) => user.role,
    },
    {
      label: "Date",
      render: (user: IUser) => user.date.toISOString().slice(0, 10),
      sortValue: (user: IUser) => user.date,
    },
    {
      label: "Email",
      render: (user: IUser) => user.email,
    },
  ];

  const keyFn = (user: IUser) => {
    return user.id;
  };

  const lowercasedSearchText = searchText.toLowerCase();

  const filterData = data.filter(({ name, role, email }) => {
    const lowercasedName = name.toLowerCase();
    const lowercasedRole = role.toLowerCase();
    const lowercasedEmail = email.toLowerCase();

    return (
      lowercasedName.includes(lowercasedSearchText) ||
      lowercasedRole.includes(lowercasedSearchText) ||
      lowercasedEmail.includes(lowercasedSearchText)
    );
  });

  return (
    <div className="min-h-screen bg-[#EAE4DD] relative">
      {isModalWelcome && (
        <Modal onClose={handleModalClose}>
          <WelcomeMessage name={username} onClick={handleModalClose} />
        </Modal>
      )}
      <Navbar />
      <div className="flex justify-center gap-2 pt-24 p-3 h-screen">
        <div className="h-full w-full md:w-[80%] max-w-5xl flex flex-col overflow-auto gap-8 items-center bg-white rounded-lg py-3">
          <div className="w-full flex flex-col gap-2 px-2">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-2">
              <Search value={searchText} onChange={handleSearchChange} />
              <div className="flex flex-row gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <div className="text-sm font-semibold">Sort by</div>
                  <Dropdown
                    name="Sort by"
                    options={optionsSortBy}
                    value={sortBy}
                    onChange={handleSortBy}
                  />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <div className="text-sm font-semibold">From</div>
                  <Dropdown
                    name="Order"
                    options={optionsSortFrom}
                    value={sortFrom}
                    onChange={handleSortFrom}
                  />
                </div>
              </div>
            </div>
            <div className="hidden md:block overflow-x-auto">
              <SortableTable
                data={filterData}
                config={configTable}
                keyFn={keyFn}
                DropdownsortBy={sortBy?.value || "Date"}
                DropdownsortOrder={sortFrom?.value || "desc"}
              />
            </div>
            <div className="block md:hidden overflow-x-auto">
              <CardUser
                data={filterData}
                config={configTable}
                keyFn={keyFn}
                DropdownsortBy={sortBy?.value || "Date"}
                DropdownsortOrder={sortFrom?.value || "desc"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
