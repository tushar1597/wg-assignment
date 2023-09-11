import { useEffect, useRef, useState } from "react";
import cross from "../../assets/images/cross.png";

const Dropdown = ({ placeholder, mode, data, className, handleSelect }) => {
  const [isMultiple, setIsMultiple] = useState(mode === "multiple");
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [listData, setListData] = useState(data);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    setInputValue(value);

    const newData = value
      ? data.filter(({ label }) => {
          if (label.toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
          return false;
        })
      : data;
    setListData(newData);
  };

  const handleClick = (e) => {
    const { idx, type } = e.currentTarget.dataset;
    let dataObj = {};
    if (type === "list") {
      dataObj = listData[idx];
    } else {
      dataObj = data[idx];
    }

    if (dataObj.disabled) {
      return;
    }

    if (isMultiple) {
      const res = { ...selectedValues };
      res[dataObj.value] = !res[dataObj.value];
      setSelectedValues(res);
      if (res[dataObj.value]) {
        setSelectedCount(selectedCount + 1);
      } else {
        setSelectedCount(selectedCount - 1);
      }
      if (typeof handleSelect === "function") {
        handleSelect(res);
      }
    } else {
      const res = {};
      res[dataObj.value] = true;
      setSelectedValues(res);
      setSelectedCount(1);
      setInputValue(dataObj.label);
      setOpen(false);
      if (typeof handleSelect === "function") {
        handleSelect(res);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", function (e) {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    });
  });

  return (
    <div
      ref={dropdownRef}
      className={`drop-down relative ${className}`}
      onFocus={handleFocus}
    >
      <div className="tag-inp-container">
        {isMultiple ? (
          <div className="tags">
            {data?.length
              ? data.map(({ value, label }, index) => {
                  if (selectedValues[value]) {
                    return (
                      <span
                        key={`tag-${value}`}
                        className="tag"
                        data-idx={index}
                        data-type="tag"
                        onClick={handleClick}
                      >
                        {label} <img className="cross-img" src={cross} />
                      </span>
                    );
                  } else {
                    return null;
                  }
                })
              : null}
          </div>
        ) : null}
        <input
          ref={inputRef}
          placeholder={placeholder || "Search"}
          value={inputValue}
          onChange={handleChange}
        ></input>
      </div>
      <ul className={`list absolute ${isOpen ? "list-open" : ""}`}>
        {listData?.length
          ? listData.map(({ value, label, disabled }, index) => {
              return (
                <li
                  key={value}
                  className={`${disabled ? "li-disabled" : ""} ${
                    selectedValues[value] ? "li-selected" : ""
                  }`}
                  onClick={handleClick}
                  value={value}
                  data-idx={index}
                  data-type="list"
                >
                  {label}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default Dropdown;
