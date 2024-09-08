import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedPage = ({ children, isAuthenticated }: Props) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedPage;
