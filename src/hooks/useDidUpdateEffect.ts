import { useEffect, useRef } from "react";

export const useDidUpdateEffect = (fn: any, inputs: any[]) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
};
