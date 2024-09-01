import { cn, idGenerator } from "@/lib/utils";
import DesignerSideBar from "../designerSideBar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import useDesigner from "@/hooks/useDesigner";
import { FormElements } from "../FormElements";
import { ElementsType } from "@/types/FormElementsTypes";
import DesignerElementWrapper from "./DesignerElementWrapper";

const Designer = () => {
  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useDesigner();

  const { setNodeRef, isOver } = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;
      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;

      // First Scenario
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;
      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;
      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      // Second Scenario
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        const overId = over.data?.current?.elementId;
        const overElementIdx = elements.findIndex((el) => el.id === overId);
        if (overElementIdx === -1) throw new Error("Element not found");

        let indexForNewElement = overElementIdx; // for top-half
        if (isDroppingOverDesignerElementBottomHalf)
          indexForNewElement = overElementIdx + 1; // for bottom-half

        addElement(indexForNewElement, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      // Third Scenario
      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;
        const activeElementIdx = elements.findIndex((el) => el.id === activeId);
        const overElementIdx = elements.findIndex((el) => el.id === overId);

        if (activeElementIdx === -1 || overElementIdx === -1)
          throw new Error("Element not found");

        removeElement(activeId);

        const activeElement = { ...elements[activeElementIdx] };
        let newIdx = overElementIdx; // assume dropped on top half of over element
        if (isDroppingOverDesignerElementBottomHalf)
          newIdx = overElementIdx + 1;

        addElement(newIdx, activeElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start overflow-y-auto",
            isOver && "ring-4 ring-primary ring-inset"
          )}
        >
          {!isOver && elements.length == 0 && (
            <p className="text-3xl text-muted-foreground font-bold flex flex-grow items-center">
              Drop here
            </p>
          )}

          {isOver && elements.length == 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>

      <DesignerSideBar />
    </div>
  );
};

export default Designer;
