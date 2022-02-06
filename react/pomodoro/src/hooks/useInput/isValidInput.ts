export type validatorName = 'email' | 'userName' | "equalTo";

type tIsValidInput = {
  value: string
  validators?: Array<validatorName>,
}

export const isValidInput = ({ value, validators }: tIsValidInput) => {
  if (!validators) return { isValid: true, errorsTypes: [] };

  let isValid = false;
  const errorsTypes: Array<string> = [];

  for (const validator of validators) {
    if (validator === "email") {
      const re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      isValid = !value ? true : re.test(value); //if value is empty set valid 
      setErrorTypes("email");
    }
    if (validator === "equalTo") {
      console.log('equal To');

      // const lettersRx = new RegExp(/[^\p{L}'`\s-]+/gmu);
      // const twoSpacesRx = new RegExp(/\s\s+/gm);
      // return !lettersRx.test(v) && !twoSpacesRx.test(v);
    }
    if (validator === "userName") {
      // const lettersRx = new RegExp(/[^\p{L}'`\s-]+/gmu);
      // const twoSpacesRx = new RegExp(/\s\s+/gm);
      // return !lettersRx.test(v) && !twoSpacesRx.test(v);
    }
  }

  function setErrorTypes(typeErr: validatorName) {
    !isValid && errorsTypes.push(typeErr);
    isValid && errorsTypes.filter(item => item !== typeErr);
  }

  return { isValid, errorsTypes };
}
