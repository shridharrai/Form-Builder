import { getFormById } from "@/actions/form";
import FormBuilder from "@/components/formBuilder";
import React from "react";

interface BuilderPageProps {
  params: {
    id: string;
  };
}

const BuilderPage: React.FC<BuilderPageProps> = async ({ params: { id } }) => {
  const form = await getFormById(Number(id));

  if (!form) throw new Error("Form not found");

  return <FormBuilder form={form} />;
};

export default BuilderPage;
