import { getFormById } from "@/actions/form";
import FormDetails from "@/components/formDetails";
import React from "react";

interface FormDetailsPageProps {
  params: {
    id: string;
  };
}

const FormDetailsPage: React.FC<FormDetailsPageProps> = async ({
  params: { id },
}) => {
  const form = await getFormById(Number(id));

  if (!form) throw new Error("Form not found");

  return <FormDetails form={form} />;
};

export default FormDetailsPage;
