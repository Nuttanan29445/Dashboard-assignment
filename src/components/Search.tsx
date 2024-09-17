import { ChangeEventHandler } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  value: string;
  onChange: ChangeEventHandler;
}

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className="bg-[#F7F8FC] rounded-xl flex items-center px-2 h-fit text-sm">
      <SearchIcon />
      <input
        type="text"
        value={value}
        className="px-2 py-3 border-none outline-none bg-[#F7F8FC]"
        placeholder="search"
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
