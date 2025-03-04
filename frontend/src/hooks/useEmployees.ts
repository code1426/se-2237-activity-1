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
            const response = await fetch("http://localhost:5000/employees", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
            });

            if (!response.ok) {
            setError("Network response was not ok");
            }

          const data = await response.json();
          console.log("Employees: ", data);
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