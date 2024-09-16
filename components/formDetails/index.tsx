import { Form } from "@prisma/client";
import VisitButton from "../customButtons/VisitButton";
import FormLinkShare from "../customButtons/FormLinkShare";
import { StatsCards } from "../statsCards";
import SubmissionsTable from "./SubmissionsTable";

const FormDetails = ({ form }: { form: Form }) => {
  const visits = form.visits || 0;
  const submissions = form.submissions || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  let bounceRate = 100 - submissionRate;

  const formStatsData = { visits, submissions, submissionRate, bounceRate };

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareUrl={form.shareURL} />
        </div>
      </div>

      <div className="py-4 border-b border-muted">
        <div className="flex items-center justify-between gap-2 container">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>

      <div className="container">
        <StatsCards loading={false} data={formStatsData} />
      </div>

      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
};

export default FormDetails;
