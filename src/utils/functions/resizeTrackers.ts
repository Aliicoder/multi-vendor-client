import { RefObject } from "react";

export let trackElementHeight = (
  reference: RefObject<HTMLDivElement | HTMLFormElement>,
  element: string
) => {
  if (reference && reference.current) {
    const handleResize = () => {
      if (reference.current?.clientHeight) {
        const height = reference.current.clientHeight;

        document.documentElement.style.setProperty(
          element + "-height",
          `${height}px`
        );
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    if (reference.current) resizeObserver.observe(reference.current);
    return () => {
      resizeObserver.disconnect();
    };
  }
};

export let trackElementDimension = (
  reference: RefObject<HTMLDivElement | HTMLFormElement>,
  element: string
) => {
  if (reference && reference.current) {
    const handleResize = () => {
      if (reference.current?.clientHeight && reference.current?.clientWidth) {
        const height = reference.current.clientHeight;
        const width = reference.current.clientWidth;

        document.documentElement.style.setProperty(
          element + "-height",
          `${height}px`
        );
        document.documentElement.style.setProperty(
          element + "-width",
          `${width}px`
        );
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    if (reference.current) resizeObserver.observe(reference.current);
    return () => {
      resizeObserver.disconnect();
    };
  }
};

export let trackElementWidth = (
  reference: RefObject<HTMLDivElement | HTMLFormElement>,
  element: string
) => {
  if (reference && reference.current) {
    const handleResize = () => {
      if (reference.current?.clientWidth) {
        const width = reference.current.clientWidth;

        document.documentElement.style.setProperty(
          element + "-width",
          `${width}px`
        );
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    if (reference.current) resizeObserver.observe(reference.current);
    return () => {
      resizeObserver.disconnect();
    };
  }
};
