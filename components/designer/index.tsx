import DesignerSideBar from "../designerSideBar";
import { useDroppable } from "@dnd-kit/core";

const Designer = () => {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow
        items-center justify-start overflow-y-auto"
        >
          <p className="text-3xl text-muted-foreground font-bold flex flex-grow items-center">
            Drop here
          </p>
        </div>
      </div>

      <DesignerSideBar />
    </div>
  );
};

export default Designer;
