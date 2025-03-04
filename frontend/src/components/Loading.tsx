import "../styles/Loading.css";

interface LoadingProps {
  message?: string;
}

const Loading = ({message="Loading Employees..."}: LoadingProps) => {
  return (
    <div className="loading">{message}</div>
  )
}

export default Loading;