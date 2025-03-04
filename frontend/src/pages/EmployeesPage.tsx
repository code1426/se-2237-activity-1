import useEmployees from "../hooks/useEmployees"
const EmployeesPage = () => {
  const {employees} = useEmployees()
  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.name} - {employee.role}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EmployeesPage