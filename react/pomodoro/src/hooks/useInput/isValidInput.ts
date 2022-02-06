export const validatorName = {
  email: 'email',
  userName: 'userName'
} as const;

type validator = { errMsg?: string | null; successMsg?: string | null; };
export type tValidators = Partial<Record<keyof typeof validatorName, validator>>;

type tIsValidInput = {
  value: string
  validators?: tValidators
}

export const isValidInput = ({ value, validators }: tIsValidInput) => {
  if (!validators) return { isValid: true, errorsTypes: [] };

  let isValid = false;
  const errorsTypes: Array<string> = [];

  for (const validator in validators) {
    if (validator === validatorName.email) {
      const re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      isValid = re.test(value);
      !isValid && errorsTypes.push(validatorName.email);
      isValid && errorsTypes.filter(item => item !== validatorName.email);
    }
    if (validator === validatorName.userName) {
      // const lettersRx = new RegExp(/[^\p{L}'`\s-]+/gmu);
      // const twoSpacesRx = new RegExp(/\s\s+/gm);
      // return !lettersRx.test(v) && !twoSpacesRx.test(v);
    }
  }

  return { isValid, errorsTypes };
}
