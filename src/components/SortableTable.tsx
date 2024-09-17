import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Table from "./Table";
import useSort from "../hooks/use-sort";
import { Config, IUser } from "../types/user";
interface TableProp {
  data: IUser[];
  config: Config<IUser>[];
  keyFn: (data: IUser) => number;
  DropdownsortBy: string;
  DropdownsortOrder: string;
}

const SortableTable = ({
  data,
  config,
  keyFn,
  DropdownsortBy,
  DropdownsortOrder,
}: TableProp) => {
  const { sortedData, setSortColumn, sortBy, sortOrder } = useSort(
    data,
    config,
    DropdownsortBy,
    DropdownsortOrder
  );

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th onClick={() => setSortColumn(column.label)}>
          <div className="flex items-center  text-[#989fa5]">
            {getIcons(column.label, sortBy, sortOrder)}
            <div className="ml-1 cursor-pointer text-[#989fa5] font-bold text-sm">
              {column.label}
            </div>
          </div>
        </th>
      ),
    };
  });

  return <Table keyFn={keyFn} datas={sortedData} config={updatedConfig} />;
};

function getIcons(
  label: string,
  sortBy: string | null,
  sortOrder: string | null
) {
  if (label !== sortBy) {
    return (
      <div>
        <ArrowDropDownIcon />
      </div>
    );
  }
  if (sortOrder === "asc") {
    return (
      <div>
        <ArrowDropUpIcon />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <ArrowDropDownIcon />
      </div>
    );
  }
}
export default SortableTable;
