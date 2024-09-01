import { FormElementInstance } from "@/types/FormElementsTypes";
import { FormElements } from "../FormElements";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { Button } from "../ui/button";
import { BiSolidTrash } from "react-icons/bi";
import useDesigner from "@/hooks/useDesigner";
import { cn } from "@/lib/utils";

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { id, type } = element;
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();

  const [isMouseOver, setIsMouseOver] = useState(false);
  const topHalf = useDroppable({
    id: id + "-top",
    data: {
      id,
      type,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: id + "-bottom",
    data: {
      id,
      type,
      isBottomHalfDesignerElement: true,
    },
  });
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: id + "-drag-handler",
    data: {
      elementId: id,
      type,
      isDesignerElement: true,
    },
  });

  if (isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="relative h-[120px] flex flex-col text-foreground rounded-md ring-1 ring-accent 
    ring-inset hover:cursor-pointer"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={(e) => {
        setSelectedElement(element);
        e.stopPropagation();
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-md"
      />

      {isMouseOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={(e) => {
                removeElement(element.id);
                e.stopPropagation(); // to avoid selection of ele on delete click
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}

      {topHalf.isOver && (
        <div className="absolute top-0 w-full h-[7px] bg-primary rounded-md rounded-b-none"></div>
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          isMouseOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full h-[7px] bg-primary rounded-md rounded-b-none"></div>
      )}
    </div>
  );
};

export default DesignerElementWrapper;
