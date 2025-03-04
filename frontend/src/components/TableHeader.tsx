import "../styles/TableHeader.css";

const TableHeader = () => {
  return (
    <div>
      <div className="table-header">
        <div className="table-header-field">Name</div>
        <div className="table-header-field">Role</div>
        <div className="table-header-field">Salary</div>
        <div className="table-header-field">Level</div>
      </div>
    </div>
  )
}

export default TableHeader