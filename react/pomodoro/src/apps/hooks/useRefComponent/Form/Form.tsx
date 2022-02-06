import React, { FC, FormEvent } from "react";
import { useInput } from "../../../../hooks/useInput/useInput";

interface iFormProps {
  [key: string]: any;
}

export const Form: FC<iFormProps> = () => {
  const { value, errors, isValid, inputRef, onChangeHandler, onBlurHandler } =
    useInput({
      defaultValue: "123",
      filters: ["onlyLetters"],
      validators: { email: {} },
    });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit", value);
  };

  return (
    <form>
      <h1>Form with uncontrolled inputs</h1>

      <label htmlFor="inputId">{"Label"}</label>
      <input
        id="inputId"
        type="text"
        ref={inputRef}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />

      <button onClick={submitHandler} type="submit">
        {isValid ? "Valid" : "NOT valid !!!"}
      </button>

      {!isValid && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          Error: {errors?.[0]}
        </div>
      )}
    </form>
  );
};
