import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('jwt_token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('./login');
    }
  }, [token, navigate]);

  return children;
};

export default ProtectedRoute;
