import { useState } from "react";

export const useIsOpen = () => {
  // const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
    window.history.pushState("open", null);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  return { isOpen, onOpen, onClose };
};
