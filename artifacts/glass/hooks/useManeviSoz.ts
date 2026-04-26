import { useEffect, useState } from "react";

import { getManeviSozOfNow, ManeviSoz } from "@/constants/maneviSozler";

export function useManeviSoz(rotateMs: number = 60_000): ManeviSoz {
  const [soz, setSoz] = useState<ManeviSoz>(() => getManeviSozOfNow());

  useEffect(() => {
    const interval = setInterval(() => {
      setSoz(getManeviSozOfNow());
    }, rotateMs);
    return () => clearInterval(interval);
  }, [rotateMs]);

  return soz;
}
