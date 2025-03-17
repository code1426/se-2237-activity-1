
import { Input } from "@/components/ui/input";
import { StudentFormValues } from "@/lib/types";
import { format } from "date-fns";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";

interface StudentFormProps {
  initialData: StudentFormValues;
  onSubmit: SubmitHandler<StudentFormValues>;
}

export default function StudentForm({ initialData, onSubmit }: StudentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormValues>({
    defaultValues: initialData,
  });

  // Reset form values when initialData changes (switching between edit and add)
  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <Input
          {...register("firstName", { required: "First name is required" })}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <Input
          {...register("lastName", { required: "Last name is required" })}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Group Name
        </label>
        <Input
          {...register("groupName", { required: "Group name is required" })}
        />
        {errors.groupName && (
          <p className="text-red-500 text-sm">{errors.groupName.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <Input {...register("role", { required: "Role is required" })} />
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Expected Salary
        </label>
        <Input
          type="number"
          {...register("expectedSalary", {
            required: "Expected salary is required",
            valueAsNumber: true,
          })}
        />
        {errors.expectedSalary && (
          <p className="text-red-500 text-sm">
            {errors.expectedSalary.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Expected Date of Defense
        </label>
        <Input
          type="date"
          {...register("expectedDateOfDefense", {
            required: "Defense date is required",
          })}
          defaultValue={format(
            new Date(initialData.expectedDateOfDefense),
            "yyyy-MM-dd"
          )}
        />
        {errors.expectedDateOfDefense && (
          <p className="text-red-500 text-sm">
            {errors.expectedDateOfDefense.message}
          </p>
        )}
      </div>
      <Button type="submit" className="mt-4">
        {initialData.id ? "Update" : "Create"}
      </Button>
    </form>
  );
}