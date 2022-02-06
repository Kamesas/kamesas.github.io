import React, { ChangeEvent, FC, FormEvent } from "react";
import { returnUseInput, useInput } from "../../../../hooks/useInput/useInput";

interface iFormProps {
  [key: string]: any;
}

export const Form: FC<iFormProps> = () => {
  const email = useInput();
  const userName = useInput();

  console.log("userName", userName);

  const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    email.inputAttr.onChange(e);
    const isMatch = e.target.value === userName.value;
    userName.setErrors(setNotMatchErrors(userName, isMatch));
  };

  const onChangeUserNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    userName.inputAttr.onChange(e);
    const isMatch = e.target.value === email.value;
    userName.setErrors(setNotMatchErrors(userName, isMatch));
  };

  const setNotMatchErrors = (
    input: returnUseInput,
    isMatch: boolean,
    onBlur: boolean = false
  ) => {
    if (!input.wasOnblur && !onBlur) return input.errors;

    return isMatch
      ? input.errors.filter((item) => item !== "notMatch")
      : Array.from(new Set([...input.errors, "notMatch"]));
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log("form", email, userName);
  };

  return (
    <>
      <h1>Form with uncontrolled inputs</h1>

      <form>
        <fieldset>
          <label htmlFor="inputId">Email</label>
          <input
            id="inputId"
            type="text"
            {...email.inputAttr}
            onChange={onChangeEmailHandler}
          />
          {email.errors.length > 0 && (
            <div style={{ color: "red", marginTop: "1rem" }}>
              Error: {JSON.stringify(email.errors, null, 4)}
            </div>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="userNameInputId">UserName</label>
          <input
            id="userNameInputId"
            type="text"
            {...userName.inputAttr}
            onChange={onChangeUserNameHandler}
          />
          {userName.errors.length > 0 && (
            <div style={{ color: "red", marginTop: "1rem" }}>
              Error: {JSON.stringify(userName.errors, null, 4)}
            </div>
          )}
        </fieldset>

        <button onClick={submitHandler} type="submit">
          {email.isValid ? "Valid" : "NOT valid !!!"}
        </button>
      </form>
    </>
  );
};
