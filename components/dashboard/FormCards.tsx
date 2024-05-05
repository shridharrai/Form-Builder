import { getForms } from "@/actions/form";
import { FormCard } from "./FormCard";

export const FormCards = async () => {
  const forms = await getForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};
