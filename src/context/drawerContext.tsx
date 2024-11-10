import React, { createContext, useContext, useState } from "react";

export type DrawerContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <DrawerContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context)
    throw new Error("useDrawer must be used within a DrawerProvider");
  return context;
};
