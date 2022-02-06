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
  const [errors, setErrors] = useState<Array<string>>([]);
  const [wasOnblur, setOnblur] = useState(false);
  const [wasUserChanges, setUserChanges] = useState(false);

  useEffect(() => {
    defaultValue && setValueByForce(defaultValue);
  }, [defaultValue]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;
    setUserChanges(true);

    checkFilters(e.target.value);
    wasOnblur && checkValidation(e.target.value);
  }

  const onBlurHandler = () => {
    setOnblur(true);

    if (!wasOnblur && inputRef.current) {
      checkFilters(inputRef.current?.value)
      checkValidation(inputRef.current?.value);
    }
  }

  function setValueByForce(defaultValue: string) {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }

  const checkFilters = (value: string) => {
    if (!inputRef.current || !filters?.length) return;
    const filteredValue = inputFilterValue({ filters, value });
    inputRef.current.value = filteredValue;
  }

  const checkValidation = (value: string) => {
    if (validators) {
      const isValidInputObj = isValidInput({ value, validators });
      setIsValid(isValidInputObj.isValid);
      if (!equalsArrayIgnoreOrder(errors, isValidInputObj.errorsTypes)) setErrors([...isValidInputObj.errorsTypes]);
    }
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

function equalsArrayIgnoreOrder<T, U>(a: Array<T>, b: Array<U>) {
  if (a.length !== b.length) return false;
  const uniqueValues = Array.from(new Set([...a, ...b]));
  for (const v of uniqueValues) {
    const aCount = a.filter(e => e === v).length;
    const bCount = b.filter(e => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
}
