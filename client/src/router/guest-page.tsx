import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const GuestPage = ({ children, isAuthenticated }: Props) => {
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

export default GuestPage;
