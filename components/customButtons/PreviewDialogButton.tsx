import { Button } from "../ui/button";
import { MdPreview } from "react-icons/md";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import useDesigner from "@/hooks/useDesigner";
import { FormElements } from "../FormElements";

const PreviewDialogButton = () => {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdPreview className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow 
      p-0 gap-0"
      >
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Form preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to the users.
          </p>
        </div>

        <div
          className="bg-accent flex flex-col flex-grow items-center justify-center p-4 
        overflow-y-auto bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]"
        >
          <div
            className="h-full w-full max-w-[620px] flex flex-col flex-grow gap-4 bg-background 
          rounded-2xl p-8 overflow-y-auto"
          >
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;

              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogButton;
