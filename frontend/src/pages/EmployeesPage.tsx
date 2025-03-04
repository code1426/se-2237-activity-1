import useEmployees from "../hooks/useEmployees"
import EmployeeList from "../components/EmployeeList"
import Card from "../components/Card"
import Loading from "../components/loading"
import TableHeader from "../components/TableHeader"

const EmployeesPage = () => {
  const {employees, loading, error} = useEmployees()

  if (error) {
    return <div className="loading">{error}</div>
  }

  return (
    <Card>
      <h2 className="page-title">
        Employees
      </h2>
      <TableHeader />
      {loading ? <Loading /> : <EmployeeList employees={employees} />}
      
    </Card>
  )
}

export default EmployeesPage