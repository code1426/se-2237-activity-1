import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Student } from "@/lib/types";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

export default function StudentTable({
  students,
  isLoading,
  onEdit,
  onDelete,
}: StudentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Group</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Expected Salary</TableHead>
          <TableHead>Defense Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : (
          students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                {student.firstName} {student.lastName}
              </TableCell>
              <TableCell>{student.groupName}</TableCell>
              <TableCell>{student.role}</TableCell>
              <TableCell>Php {student.expectedSalary}</TableCell>
              <TableCell>
                {format(new Date(student.expectedDateOfDefense), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(student)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(student.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
