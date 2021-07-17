import React, { useRef, useEffect } from "react";

function Input({
  type,
  placeholder,
  value,
  onChange,
  accessory,
  autoFocus = false,
}) {
  const renderCount = useRef(0);
  const inputElement = useRef(null);

  console.log("Render", placeholder, ++renderCount.current);
  console.log(inputElement.current);

  useEffect(() => {
    if (autoFocus) {
      inputElement.current.focus();
    }
  }, [autoFocus]);

  return (
    <div style={{ display: "flex" }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={inputElement}
      />
      {accessory}
    </div>
  );
}

export default React.memo(Input);
