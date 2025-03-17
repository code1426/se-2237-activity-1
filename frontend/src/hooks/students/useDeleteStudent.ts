import { useState } from "react";

export default function useDeleteStudent(): {
  deleteStudent: (id: number) => Promise<void>;
  loading: boolean;
  error: Error | null;
} {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteStudent = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete student");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteStudent, loading, error };
}