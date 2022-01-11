import React, { useState } from 'react';

function CheckInput({
  className,
  initialValue,
  onChange,
}: {
  className: string;
  initialValue?: boolean;
  onChange?: (isChecked: boolean) => void;
}): JSX.Element {
  const [isChecked, setIsChecked] = useState(initialValue);
  return (
    <button
      className={`checkbox ${className} ${isChecked ? 'active' : ''}`}
      onClick={(e): void => {
        e.preventDefault();
        e.stopPropagation();
        onChange?.(isChecked ?? true);
        setIsChecked(!isChecked);
      }}
    />
  );
}

export default CheckInput;
