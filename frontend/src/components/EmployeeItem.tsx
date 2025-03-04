
import Card from "./Card"
import "../styles/EmployeeItem.css";
import { Employee } from "../lib/types";

const EmployeeItem = (employee: Employee) => {
  return (
    <Card className="employee-item">
      <div className="employee-item-field">
        {employee.name}
      </div>
      <div className="employee-item-field">
        {employee.role}
      </div>
      <div className="employee-item-field">
        {`Php ${employee.salary.toLocaleString()}`}
      </div>
      <div className="employee-item-field">
        {employee.salary < 50000 ? "Entry Level" : "Senior"}
      </div>
    </Card>
  )
}

export default EmployeeItem;