import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import AppInput from "../../components/Input/AppInput";
import AppButton from "../../components/Button/AppButton";

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  buttonText = "Save",
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <AppInput
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name", {
            required: "Name is required",
          })}
        />

        <AppInput
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
        />

        <AppInput
          label="Department"
          error={!!errors.department}
          helperText={errors.department?.message}
          {...register("department", {
            required: "Department is required",
          })}
        />

        <AppButton type="submit">
          {buttonText}
        </AppButton>
      </Stack>
    </form>
  );
}