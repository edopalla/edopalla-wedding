import { useEffect, useState } from "react";

export function useMountEffect(effect: () => void | (() => void)) {
  const [onMount] = useState(() => effect);
  useEffect(() => onMount(), [onMount]);
}
