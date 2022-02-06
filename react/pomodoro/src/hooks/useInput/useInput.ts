import React, { useEffect, useRef, useState } from 'react';
import { filtersName, inputFilterValue } from './inputFilterValue';
import { isValidInput, validatorName } from './isValidInput';

type inputProps = {
  defaultValue?: string;
  filters?: Array<filtersName>;
  validators?: Array<validatorName>;
  startValidationWhenInit?: ['validation' | 'filtering'];
}

export type returnUseInput = ReturnType<typeof useInput>;

export const useInput = (props?: inputProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [wasOnblur, setOnblur] = useState(false);

  useEffect(() => {
    if (!props?.defaultValue) return;
    setValueByForce(props?.defaultValue);
    checkValidationWhenInit(props?.defaultValue);
  }, [props?.defaultValue]); // eslint-disable-line

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkFilters(e.target.value);
    wasOnblur && checkValidation(e.target.value);
  }

  const onBlur = () => {
    setOnblur(true);

    if (wasOnblur || !ref.current) return;
    checkFilters(ref.current?.value)
    checkValidation(ref.current?.value);
  }

  const setValueByForce = (value: string) => {
    ref.current && (ref.current.value = value);
  }

  const checkFilters = (value: string) => {
    if (!ref.current || !props?.filters?.length) return;
    ref.current.value = inputFilterValue({ filters: props?.filters, value })
  }

  const checkValidation = (value: string) => {
    if (!props?.validators?.length) return;
    const { isValid, errorsTypes } = isValidInput({ value, validators: props?.validators });
    !equalsArrayIgnoreOrder(errors, errorsTypes) && setErrors([...errorsTypes]);
    setIsValid(isValid);
  }

  const checkValidationWhenInit = (defaultValue: string) => {
    if (!props?.startValidationWhenInit?.length) return;
    setOnblur(true);
    props?.startValidationWhenInit?.includes('validation') && checkValidation(defaultValue);
    props?.startValidationWhenInit?.includes('filtering') && checkFilters(defaultValue);
  }

  return {
    errors,
    isValid,
    value: ref.current?.value,
    setValueByForce,
    setIsValid,
    setErrors,
    wasOnblur,
    inputAttr: {
      ref,
      onBlur,
      onChange,
    }
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
