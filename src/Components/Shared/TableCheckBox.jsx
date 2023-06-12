import { forwardRef, useEffect, useRef } from "react";

export const TableCheckBox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <input
      className="form-check-input"
      type="checkbox"
      id="flexCheckDefault"
      ref={resolvedRef}
      {...rest}
    />
  );
});
