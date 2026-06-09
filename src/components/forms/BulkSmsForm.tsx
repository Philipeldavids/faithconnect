import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { smsService } from "../../lib/api/smsService";

export default function BulkSMSForm() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const submit = async (
    data: any
  ) => {
    await smsService.send(data);

    toast.success(
      "SMS queued"
    );
  };

  return (
    <form
      onSubmit={handleSubmit(
        submit
      )}
      className="bg-white p-6 rounded-xl"
    >
      <textarea
        rows={8}
        {...register(
          "message"
        )}
        className="input"
      />

      <button className="btn-primary mt-4">
        Send SMS
      </button>
    </form>
  );
}