"use client";

import { Form } from "@prisma/client";
import PreviewDialogButton from "../customButtons/PreviewDialogButton";
import SaveFormButton from "../customButtons/SaveFormButton";
import PublishFormButton from "../customButtons/PublishFormButton";
import Designer from "../designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";

const FormBuilder = ({ form }: { form: Form }) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <main className="flex flex-col w-full">
      <nav className="flex justify-between items-center p-4 gap-3 border-b-2">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Form:</span>
          {form.name}
        </h2>
        <div className="flex items-center gap-2">
          <PreviewDialogButton />
          {!form.published && (
            <>
              <SaveFormButton />
              <PublishFormButton />
            </>
          )}
        </div>
      </nav>
      <DndContext sensors={sensors}>
        <div
          className="flex w-full h-[200px] flex-grow items-center justify-center relative 
          overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]"
        >
          <Designer />
          <DragOverlayWrapper />
        </div>
      </DndContext>
    </main>
  );
};

export default FormBuilder;
