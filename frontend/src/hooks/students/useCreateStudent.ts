import { StudentFormValues, Student } from "@/lib/types";
import { useState } from "react";

export default function useCreateStudent(): {
  createStudent: (studentData: StudentFormValues) => Promise<Student>;
  loading: boolean;
  error: Error | null;
} {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createStudent = async (
    studentData: StudentFormValues
  ): Promise<Student> => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...studentData,
          // Convert the date string to a Date object before sending
          expectedDateOfDefense: new Date(studentData.expectedDateOfDefense),
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create student");
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

  return { createStudent, loading, error };
}