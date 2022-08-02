import { Select } from "antd";
import React from "react";
import { FilterItem } from "../../models/search";
import "antd/dist/antd.css";

const { Option } = Select;

interface SelectGenersProps {
  options: FilterItem[];
  selected: number[];
  setSelected: Function;
}

const SelectGeners: React.FC<SelectGenersProps> = ({
  options,
  selected,
  setSelected,
}) => {
  const handleChange = (value: number[]) => {
    setSelected([...value]);
  };

  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="Chọn thể loại truyện"
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

export default SelectGeners;
