import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { emailService } from "../../lib/api/emailService";

export default function BulkEmailForm() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const submit = async (
    data: any
  ) => {
    await emailService.send(data);

    toast.success(
      "Emails queued"
    );
  };

  return (
    <form
      onSubmit={handleSubmit(
        submit
      )}
      className="bg-white p-6 rounded-xl"
    >
      <input
        placeholder="Subject"
        {...register(
          "subject"
        )}
        className="input"
      />

      <textarea
        rows={10}
        {...register("body")}
        className="input mt-4"
      />

      <button className="btn-primary mt-4">
        Send Email
      </button>
    </form>
  );
}