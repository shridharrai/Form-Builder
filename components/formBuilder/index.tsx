"use client";

import { Form } from "@prisma/client";
import PreviewDialogButton from "../customButtons/PreviewDialogButton";
import SaveFormButton from "../customButtons/SaveFormButton";
import PublishFormButton from "../customButtons/PublishFormButton";
import Designer from "../designer";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";

const FormBuilder = ({ form }: { form: Form }) => {
  return (
    <DndContext>
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
        <div
          className="flex w-full h-[200px] flex-grow items-center justify-center relative 
          overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]"
        >
          <Designer />
        </div>
      </main>

      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
