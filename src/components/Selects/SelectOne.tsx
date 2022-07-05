import React, { FC } from "react";
import { Select } from "antd";
import { FilterItem } from "../../models/search";
// import "antd/dist/antd.css";

const { Option } = Select;

interface SelectOneProps {
  options: FilterItem[];
  selected: number;
  setSelected: Function;
  placehoder: string;
}

const SelectOne: FC<SelectOneProps> = ({
  options,
  setSelected,
  selected,
  placehoder,
}) => {
  const handleChange = (value: number) => {
    setSelected(value);
  };

  return (
    <Select
      placeholder={placehoder}
      style={{ width: "100%" }}
      value={selected}
      onChange={handleChange}
      optionLabelProp="label"
    >
      {options.map((option) => (
        <Option key={option.name} value={option.id} label={option.name}>
          <div className="demo-option-label-item">{option.name}</div>
        </Option>
      ))}
    </Select>
  );
};

export default SelectOne;
