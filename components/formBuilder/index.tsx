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
import useDesigner from "@/hooks/useDesigner";
import { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements } = useDesigner();

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

  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
  }, [form]);

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl text-primary font-bold border-b pb-2 mb-10">
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground pb-10 border-b">
              Anyone with the link can view and submit the form
            </h3>

            <div className="w-full flex flex-col gap-2 items-center my-4 pb-4 border-b">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Copied!",
                    description: "Link copied to clipboard",
                  });
                }}
              >
                Copy link
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/"} className="gap-2">
                  <BsArrowLeft /> Go back home
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form Details <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

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
              <SaveFormButton id={form.id} />
              <PublishFormButton id={form.id} />
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
