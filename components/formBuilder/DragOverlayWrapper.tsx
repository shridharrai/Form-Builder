import { ElementsType } from "@/types/FormElementsTypes";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import SideBarBtnDragOverlay from "../designerSideBar/SideBarBtnDragOverlay";
import { FormElements } from "../FormElements";
import useDesigner from "@/hooks/useDesigner";

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesigner();

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

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((item) => item.id === elementId);

    if (!element) node = <div>Element not found!</div>;
    else {
      const DesignerElement = FormElements[element.type].designerComponent;

      node = (
        <div
          className="flex items-center bg-accent border rounded-md w-full h-[120px] px-4 py-2 
        opacity-80 pointer-events-none"
        >
          <DesignerElement elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
