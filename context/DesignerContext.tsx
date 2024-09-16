"use client";

import { DesignerContextType } from "@/types/ContextTypes";
import { FormElementInstance } from "@/types/FormElementsTypes";
import { ReactNode, createContext, useState } from "react";

export const DesignerContext = createContext<DesignerContextType | null>(null);

export const DesignerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const updatedElements = [...prev];
      const index = updatedElements.findIndex((element) => element.id === id);
      updatedElements[index] = element;
      return updatedElements;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
};
