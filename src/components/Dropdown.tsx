import React, { useEffect, useState, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  name: string | null;
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const divEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (divEl.current && !divEl.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option: Option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => (
    <div
      onClick={() => handleOptionClick(option)}
      key={option.value}
      className="hover:bg-[#bebfc2] rounded cursor-pointer p-1"
    >
      {option.label}
    </div>
  ));

  return (
    <div ref={divEl} className="relative">
      <div
        className="flex justify-between items-center font-medium cursor-pointer bg-[#F7F8FC] rounded-xl px-3 shadow w-full"
        onClick={handleClick}
      >
        {value?.label || name}
        <ArrowDropDownIcon />
      </div>
      {isOpen && (
        <div className="absolute font-medium top-full mt-1 border rounded-xl p-3 shadow bg-[#F7F8FC] w-full">
          {renderedOptions}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
