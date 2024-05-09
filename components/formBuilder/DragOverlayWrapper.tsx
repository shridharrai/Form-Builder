import { ElementsType } from "@/types/FormElementstypes";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import SideBarBtnDragOverlay from "../designerSideBar/SideBarBtnDragOverlay";
import { FormElements } from "../FormElements";

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => setDraggedItem(event.active),
    onDragCancel: (event) => setDraggedItem(null),
    onDragEnd: (event) => setDraggedItem(null),
  });

  if (!draggedItem) return null;

  let node = <div>No Drag Overlay</div>;

  const isSideBarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;
  if (isSideBarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SideBarBtnDragOverlay formElement={FormElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
