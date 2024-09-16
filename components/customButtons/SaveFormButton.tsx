import { HiSaveAs } from "react-icons/hi";
import { Button } from "../ui/button";
import useDesigner from "@/hooks/useDesigner";
import { updateFormContent } from "@/actions/form";
import { toast } from "../ui/use-toast";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";

const SaveFormButton = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition();
  const { elements } = useDesigner();

  const saveForm = async () => {
    try {
      const jsonContent = JSON.stringify(elements);
      await updateFormContent(id, jsonContent);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Somwthing went wrong while saving your form",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(saveForm)}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormButton;
