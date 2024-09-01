import { FormElement } from "@/types/FormElementsTypes";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      ref={setNodeRef}
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        isDragging && "ring-2 ring-primary"
      )}
      {...listeners}
      {...attributes}
    >
      <Icon className="h-8 w-8 text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarBtnElement;
