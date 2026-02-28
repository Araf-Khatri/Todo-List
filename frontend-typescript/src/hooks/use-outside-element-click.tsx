import { RefObject, useEffect } from "react";

const useOutsideElementClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
};

export default useOutsideElementClick;
