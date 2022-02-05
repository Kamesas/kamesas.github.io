import React, { FC, FormEvent } from "react";
import { useInput } from "../../../../hooks/useInput/useInput";

interface iFormProps {
  [key: string]: any;
}

export const Form: FC<iFormProps> = () => {
  const { value, errors, isValid, inputRef, onChangeHandler, onBlurHandler } =
    useInput({
      // defaultValue: "123",
      // filters: ["onlyDigits"],
      validators: { email: {} },
    });

  console.log("value Form", value, errors);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit", value);
  };

  return (
    <form>
      <h1>Form with uncontrolled inputs</h1>
      <label htmlFor="inputId">{isValid ? "Label" : "Error"}</label>
      <input
        id="inputId"
        type="text"
        ref={inputRef}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />

      <button onClick={submitHandler} type="submit">
        submit
      </button>
    </form>
  );
};
