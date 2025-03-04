import { useEffect, useState } from "react";
import { Employee } from "../lib/types";

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

      const fetchEmployees = async () => {
        setLoading(true);
        try {
          const response = await fetch("/employees");
          const data = await response.json();
          setEmployees(data);
        } catch {
          setError("Something went wrong. Please try again later.");
          } finally {
            setLoading(false);
          }
        } 

        fetchEmployees();
    }, []);

    return { employees, loading, error };
}

export default useEmployees;