export interface Employee {
  id: number;
  name: string;
  role: string;
  salary: number;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  groupName: string;
  role: string;
  expectedSalary: number;
  // expectedDateOfDefense is stored as an ISO date string (e.g., "2025-03-17")
  expectedDateOfDefense: string;
}

export interface StudentFormValues {
  id?: number;
  firstName: string;
  lastName: string;
  groupName: string;
  role: string;
  expectedSalary: number;
  // Using ISO string format for date (yyyy-MM-dd)
  expectedDateOfDefense: string;
}