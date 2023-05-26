import { useCallback, useState } from "react";

type ErrorType = {
  error: boolean;
  errorText: string;
};

const useError = () => {
  const [error, setError] = useState<ErrorType>({
    error: false,
    errorText: "",
  });
  const setErrorsFn = useCallback(
    (errorText: string) => {
      setError({
        error: true,
        errorText,
      });
      setTimeout(() => {
        setError({
          error: false,
          errorText: "",
        });
      }, 2000);
    },
    []
  );

  return {
    setErrorsFn,
    error,
  };
};

export default useError;
