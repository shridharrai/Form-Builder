import { cn, idGenerator } from "@/lib/utils";
import DesignerSideBar from "../designerSideBar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import useDesigner from "@/hooks/useDesigner";
import { FormElements } from "../FormElements";
import { ElementsType } from "@/types/FormElementsTypes";
import DesignerElementWrapper from "./DesignerElementWrapper";

const Designer = () => {
  const { elements, addElement, selectedElement, setSelectedElement } =
    useDesigner();

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

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(0, newElement);
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
            isOver && "ring-2 ring-primary/20"
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
