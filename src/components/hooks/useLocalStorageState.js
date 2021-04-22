import { useRef, useEffect, useState } from "react";

const useLocalStorageState = (
  key,
  defaultValue = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  const prevKeyRef = useRef(key); // useRef to not rerender

  const [state, setState] = useState(() => {
    const valuesToLocalStorage = window.localStorage.getItem(key);
    if (valuesToLocalStorage) {
      return deserialize(valuesToLocalStorage);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;

    window.localStorage.setItem(key, serialize(state));
  }, [key, serialize, state]);

  return [state, setState];
};

export default useLocalStorageState;
