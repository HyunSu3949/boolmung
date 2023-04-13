import axiosInstance from "../utils/instance";

const movePosition = async (roomId: string, position: number[]) => {
  await axiosInstance.post(`/rooms/${roomId}/move`, position);
};

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const debouncedMovePosition = debounce(movePosition, 1000);

export const throttler = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let throttleCheck: ReturnType<typeof setTimeout> | null;
  const throttled = (...args: Parameters<F>) => {
    if (!throttleCheck) {
      throttleCheck = setTimeout(() => {
        func(...args);
        throttleCheck = null;
      }, waitFor);
    }
  };
  return throttled as (...args: Parameters<F>) => ReturnType<F>;
};

export const throttledMovePosition = throttler(movePosition, 1000);
