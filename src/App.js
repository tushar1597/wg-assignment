import { useState } from "react";
import "./App.css";
import ReactGridLayout from "./components/react-grid-layout";
import Dropdown from "./components/dropdown";

function App() {
  const [active, setActive] = useState("2");
  const handleClick = (e) => {
    const number = e.currentTarget?.dataset?.number;
    setActive(number);
  };
  const handleSelect = (map) => {
    console.log(map);
  };
  const handleSelect2 = (map) => {
    console.log(map);
  };

  return (
    <div className="App">
      <button
        className={`btn ${active === "1" ? "btn-active" : ""}`}
        onClick={handleClick}
        data-number={1}
      >
        Question-1
      </button>
      <button
        className={`btn ${active === "2" ? "btn-active" : ""}`}
        onClick={handleClick}
        data-number={2}
      >
        Question-2
      </button>
      {active === "1" ? (
        <ReactGridLayout columns={2} numberOfBoxes={12} />
      ) : null}
      {active === "2" ? (
        <div className="dd-wrapper">
          <Dropdown
            className="dd-custom"
            handleSelect={handleSelect}
            placeholder="Select Person"
            data={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "james", label: "James" },
              { value: "marvin", label: "Marvin" },
              { value: "rosy", label: "Rosy" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
          <Dropdown
            className="dd-custom"
            mode="multiple"
            handleSelect={handleSelect2}
            data={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "james", label: "James" },
              { value: "marvin", label: "Marvin" },
              { value: "rosy", label: "Rosy" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </div>
      ) : null}
    </div>
  );
}

export default App;
