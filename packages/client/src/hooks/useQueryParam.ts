const useQueryParam = (param: string): string | null => {
  const params = new URLSearchParams();
  return params.get(param);
};

export default useQueryParam;
