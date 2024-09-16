import { MdOutlinePublish } from "react-icons/md";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useTransition } from "react";
import { FaIcons } from "react-icons/fa";
import { publishForm } from "@/actions/form";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const PublishFormButton = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publish() {
    try {
      await publishForm(id);
      toast({
        title: "success",
        description: "Your form is now available to the public",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "error",
        description: "Something went wrong!",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form. <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publish);
            }}
          >
            Publish {loading && <FaIcons className="animate-spin ml-2" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormButton;
