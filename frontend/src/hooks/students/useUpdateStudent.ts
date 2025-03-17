import { StudentFormValues, Student } from "@/lib/types";
import { useState } from "react";

export default function useUpdateStudent(): {
  updateStudent: (
    id: number,
    studentData: StudentFormValues
  ) => Promise<Student>;
  loading: boolean;
  error: Error | null;
} {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateStudent = async (
    id: number,
    studentData: StudentFormValues
  ): Promise<Student> => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...studentData,
          expectedDateOfDefense: new Date(studentData.expectedDateOfDefense),
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update student");
      }
      const data: Student = await res.json();
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStudent, loading, error };
}