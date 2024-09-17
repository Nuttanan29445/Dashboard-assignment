import { useEffect, useState } from "react";
import { Config, IUser } from "../types/user";

function useSort(
  data: IUser[],
  config: Config<IUser>[],
  SortBy: string,
  SortOrder: string
) {
  const [sortOrder, setSortOrder] = useState<string>(SortOrder);
  const [sortBy, setSortBy] = useState<string>(SortBy);

  useEffect(() => {
    setSortBy(SortBy);
    setSortOrder(SortOrder);
  }, [SortBy, SortOrder]);

  const setSortColumn = (label: string) => {
    if (sortBy && label !== sortBy) {
      setSortOrder("asc");
      setSortBy(label);
      return;
    }
    if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder("asc");
      setSortBy(label);
    }
  };

  let sortedData = data;

  if (sortOrder && sortBy) {
    const column = config.find((column) => column.label === sortBy);

    if (column?.sortValue) {
      sortedData = [...data].sort((a, b) => {
        const valueA = column.sortValue!(a);
        const valueB = column.sortValue!(b);

        const reverseOrder = sortOrder === "asc" ? 1 : -1;

        if (valueA instanceof Date && valueB instanceof Date) {
          return (valueA.getTime() - valueB.getTime()) * reverseOrder;
        }
        if (typeof valueA === "string" && typeof valueB === "string") {
          return valueA.localeCompare(valueB) * reverseOrder;
        }
        return (Number(valueA) - Number(valueB)) * reverseOrder;
      });
    }
  }

  return {
    sortOrder,
    sortBy,
    sortedData,
    setSortColumn,
  };
}

export default useSort;
