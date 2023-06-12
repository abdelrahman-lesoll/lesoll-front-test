import { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRanger } from "react-ranger";

const Price = ({ searchParams, setSearchParams }) => {
  const [values, setValues] = useState([
    searchParams.get("minPrice") || 0,
    searchParams.get("maxPrice") || 9999999,
  ]);
  const { getTrackProps, handles } = useRanger({
    values,
    onDrag: useCallback(
      (values) => {
        if (values[0] <= values[1]) {
          setSearchParams({
            ...Object.fromEntries([...searchParams]),
            minPrice: values[0],
            maxPrice: values[1],
          });
          setValues(values);
        }
      },
      [values]
    ),
    min: 0,
    max: 9999999,
    stepSize: 1000,
  });
  return (
    <div className="my-1">
      <div className="title mb-4">
        <h5>
          <FormattedMessage id="ChoosePrice" />
        </h5>
      </div>
      <div className="row price-input-search">
        <div className="col-sm-6 col-12 ">
          <input
            type="number"
            inputMode="numeric"
            value={values[0]}
            onChange={(e) => {
              setSearchParams({
                ...Object.fromEntries([...searchParams]),
                minPrice: Number(e.target.value) || 0,
                maxPrice: values[1],
              });
              setValues([Number(e.target.value) || 0, values[1]]);
            }}
            placeholder="Min Price"
            className="border border-radius-5 outline-0 my-1 w-50 p-2"
          />
        </div>
        <div className="col-sm-6 col-12 text-sm-end">
          <input
            type="number"
            inputMode="numeric"
            value={values[1]}
            onChange={(e) => {
              setSearchParams({
                ...Object.fromEntries([...searchParams]),
                minPrice: values[0],
                maxPrice: Number(e.target.value) || 0,
              });
              setValues([values[0], Number(e.target.value) || 0]);
            }}
            placeholder="Max Price"
            className="border border-radius-5 outline-0 my-1 w-50 p-2"
          />
        </div>
      </div>
      <div
        {...getTrackProps({
          style: {
            height: "3px",
            background: "#ddd",
            boxShadow: "outset 0 1px 2px rgba(255,255,255,.6)",
            borderRadius: "2px",
          },
        })}
        className="position-relative width-98 m-auto mt-2"
      >
        {handles.map(({ getHandleProps }) => (
          <div
            {...getHandleProps({
              style: {
                width: "12px",
                height: "12px",
                borderRadius: "100%",
                background: "white",
                border: "solid 2px #309da0",
                cursor: "pointer",
              },
            })}
            className="custom-ranger-parent"
          >
            {/* <span className="custom-ranger-section font-10 bg-light-blue text-white border-radius-5">
              {value}
            </span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Price;
