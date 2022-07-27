import { useState, useEffect } from "react";

// create an interface to type in what is returned by the hook
// in this case, the browser's window object dimensions
export interface WindowDimension {
  height: number;
  width: number;
}

export const useWindowDimensions = (): WindowDimension => {
  const [dimension, setDimension] = useState<WindowDimension>({
    height: 0,
    width: 0,
  });

  // set the dimension state property.
  const handleResize = () => {
    setDimension({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return dimension;
};
