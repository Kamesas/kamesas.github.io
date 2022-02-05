import React, { useEffect, useRef, useState } from 'react';
import { filtersName, inputFilterValue } from './inputFilterValue';
import { tValidators, isValidInput } from './isValidInput';

type inputProps = {
  defaultValue?: string;
  filters?: Array<filtersName>;
  validators?: tValidators;
}

export const useInput = ({ defaultValue, filters, validators }: inputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState<Array<string>>();
  const [wasOnblur, setOnblur] = useState(false);
  const [wasUserChanges, setUserChanges] = useState(false);

  useEffect(() => {
    defaultValue && setValueByForce(defaultValue);
  }, [defaultValue]);

  function setValueByForce(defaultValue: string) {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    setUserChanges(true);

    if (filters?.length) {
      const filteredValue = inputFilterValue({ filters, value: e.target.value });
      inputRef.current.value = filteredValue;
    };

    if (validators) {
      const isValidInputObj = isValidInput({ value: e.target.value, validators });
      setIsValid(isValidInputObj.isValid);
      // setErrors(isValidInputObj.errorsTypes)
      console.log('isValid onChange', isValidInputObj);

    }
  }

  const onBlurHandler = () => {
    console.log('onBlurHandler', inputRef.current?.value);
    setOnblur(true);
  }

  return {
    inputRef,
    value: inputRef.current?.value,
    isValid: isValid,
    errors,
    wasOnblur,
    wasUserChanges,
    onChangeHandler,
    onBlurHandler,
    setValueByForce
  };
}
