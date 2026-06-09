import MemberForm from "../../components/forms/memberForms";
import PageHeader from "../../components/layouts/PageHeader";

export default function CreateMember() {
  return (
    <>
      <PageHeader
        title="Add Member"
        subtitle="Create new member"
      />

      <MemberForm />
    </>
  );
}