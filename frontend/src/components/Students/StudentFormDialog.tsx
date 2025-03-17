import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubmitHandler } from "react-hook-form";
import { format } from "date-fns";

import type { Student, StudentFormValues } from "@/lib/types";

import StudentForm from "./StudentForm";

interface StudentFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
  onSubmit: SubmitHandler<StudentFormValues>;
}

export default function StudentFormDialog({
  isOpen,
  onOpenChange,
  selectedStudent,
  onSubmit,
}: StudentFormDialogProps){
  // Default values for a new student
  const defaultValues: StudentFormValues = {
    firstName: "",
    lastName: "",
    groupName: "",
    role: "",
    expectedSalary: 0,
    expectedDateOfDefense: format(new Date(), "yyyy-MM-dd"),
  };

  const initialData: StudentFormValues = selectedStudent
    ? {
        id: selectedStudent.id,
        firstName: selectedStudent.firstName,
        lastName: selectedStudent.lastName,
        groupName: selectedStudent.groupName,
        role: selectedStudent.role,
        expectedSalary: selectedStudent.expectedSalary,
        expectedDateOfDefense: format(
          new Date(selectedStudent.expectedDateOfDefense),
          "yyyy-MM-dd"
        ),
      }
    : defaultValues;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedStudent ? "Edit Student" : "Add Student"}
          </DialogTitle>
        </DialogHeader>
        <StudentForm initialData={initialData} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}