import React from 'react';

interface UseLocalStorageOptions {
  session?: boolean;
}

const useStorage = <T extends JSONObject = JSONObject>(
  key: string,
  { session }: UseLocalStorageOptions = {}
): [T | null, React.Dispatch<React.SetStateAction<T | null>>] => {
  const storage = session ? window.sessionStorage : window.localStorage;
  const initialState = storage.getItem(key);
  const [state, setState] = React.useState<T | null>(
    initialState ? JSON.parse(initialState) : null
  );

  React.useEffect(() => {
    storage.setItem(key, typeof state == 'string' ? state : JSON.stringify(state));
  }, [key, state, storage]);

  return [state, setState];
};

export default useStorage;
