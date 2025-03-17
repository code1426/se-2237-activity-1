import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Student, StudentFormValues } from "@/lib/types";

// components
import StudentTable from "@/components/Students/StudentsTable";
import StudentFormDialog from "@/components/Students/StudentFormDialog";
import useCreateStudent from "@/hooks/students/useCreateStudent";
import useStudents from "@/hooks/students/useStudents";
import useDeleteStudent from "@/hooks/students/useDeleteStudent";
import useUpdateStudent from "@/hooks/students/useUpdateStudent";

export default function StudentManagementPage() {

  const { students, loading, refetch } = useStudents();
  const { createStudent } = useCreateStudent();
  const { updateStudent } = useUpdateStudent();
  const { deleteStudent } = useDeleteStudent();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleFormSubmit: SubmitHandler<StudentFormValues> = async (data) => {
    try {
      if (selectedStudent) {
        // Edit mode: update student
        await updateStudent(selectedStudent.id, data);
      } else {
        // Create mode: add a new student
        await createStudent(data);
      }
      setIsDialogOpen(false);
      setSelectedStudent(null);
      refetch();
    } catch {}
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteStudent(id);
      refetch();
    } catch {}
  };

  const handleEdit = (student: Student): void => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleAdd = (): void => {
    setSelectedStudent(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Student Management</CardTitle>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </CardHeader>
        <CardContent>
          <StudentTable
            students={students}
            isLoading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
      <StudentFormDialog
        isOpen={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedStudent(null);
        }}
        selectedStudent={selectedStudent}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
