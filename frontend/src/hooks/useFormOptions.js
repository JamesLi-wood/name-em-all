import { useState } from "react";

export default function useFormOptions(options) {
  const [formOptions, setFormOptions] = useState(() => {
    const initalOptions = {};

    options.forEach((option) => {
      initalOptions[option] = false;
    });

    return initalOptions;
  });

  const handleChange = (e) => {
    const { id, checked } = e.target;
    setFormOptions((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return [formOptions, handleChange];
}
