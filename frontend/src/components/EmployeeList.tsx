
import { Employee } from '../lib/types'
import EmployeeItem from './EmployeeItem'
import TableHeader from './TableHeader'

interface EmployeeListProps {
  employees: Employee[]
}

const EmployeeList = ({employees}: EmployeeListProps) => {
  return (
    <>
      {employees.map(employee => (
        <EmployeeItem key={employee.id} {...employee} />
      ))}
    </>
  )
}

export default EmployeeList;