import { useDevice } from "react-use-device";

export function windowSize() {
  const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
  return { isMOBILE, isTABLET, isLAPTOP, isDESKTOP };
}
