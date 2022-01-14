import React, { useState } from 'react';

interface CheckBoxInterface {
  className: string;
  initialValue?: boolean;
  onChange?: (isChecked: boolean) => void;
}

function CheckBox(props: CheckBoxInterface): JSX.Element {
  const { className, initialValue, onChange } = props;
  const [isChecked, setIsChecked] = useState(initialValue);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.(isChecked ?? true);
    setIsChecked(!isChecked);
  };

  return (
    <button
      className={`checkbox ${className} ${isChecked ? 'active' : ''}`}
      onClick={onClick}
    />
  );
}

export default CheckBox;
