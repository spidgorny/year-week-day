import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useIsOpen = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
    router.push(document.location.href + "#edit");
  };
  const onClose = () => {
    setIsOpen(false);
    document.location.hash = "";
  };

  useEffect(() => {
    const onPop = () => {
      if (isOpen && document.location.hash.includes("#edit")) {
        onClose();
      }
    };
    document.addEventListener("popstate", onPop);
    return () => document.removeEventListener("popstate", onPop);
  }, [isOpen]);

  return { isOpen, onOpen, onClose };
};
