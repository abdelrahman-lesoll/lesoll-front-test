import { useState, useContext } from "react";
import { LangContext } from "../../Languages/LanguageProvider";
import { AiOutlineSearch } from "react-icons/ai";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({ filter, setFilter, selectedFlatRows }) => {
  const { locale } = useContext(LangContext);
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 100);
  return (
    <div className="d-flex align-items-center flex-wrap">
      {selectedFlatRows.length > 0 && (
        <button
          onClick={() =>
            selectedFlatRows.map((row) => console.log(row.original._id))
          }
          className="border-0 outline-0 py-2 px-3 border-radius-5 bg-danger text-white me-2 mb-2"
        >
          Clear Selected Items{" "}
        </button>
      )}
      <div className="border position-relative border-radius-5 mb-2">
        <input
          type="text"
          className="outline-0 border-0 p-2"
          placeholder="Search"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
        <AiOutlineSearch
          size="1.3rem"
          className={`text-icon position-absolute top-25 ${
            locale === "en-US" ? "right" : "left"
          }-2`}
        />
      </div>
    </div>
  );
};
