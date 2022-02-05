export type filtersName = 'onlyDigits' | 'onlyLetters';

export type tUseInputFilters = {
  value: string
  filters?: Array<filtersName>;
}

export const inputFilterValue = ({ filters, value }: tUseInputFilters) => {
  if (!filters?.length) return value;
  let filteredValue = value;

  for (const filter of filters) {
    if (filter === 'onlyDigits') {
      filteredValue = filteredValue?.replace(/\D/gm, "");
    }
    if (filter === 'onlyLetters') {
      filteredValue = filteredValue?.replace(/\d/gm, "");
    }
  }

  return filteredValue;
}
