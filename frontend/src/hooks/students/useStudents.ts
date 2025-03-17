import { Student } from "@/lib/types";
import { useState, useEffect } from "react";

export default function useStudents(): {
  students: Student[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/students");
      if (!res.ok) {
        throw new Error("Failed to fetch students");
      }
      const data: Student[] = await res.json();
      setStudents(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, error, refetch: fetchStudents };
}