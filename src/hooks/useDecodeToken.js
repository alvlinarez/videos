import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const useDecodeToken = (token) => {
  const [values, setValues] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    if (token) {
      const decodeToken = jwt.decode(token);
      if (!decodeToken) {
        setError('Invalid token.');
      } else {
        setValues({
          ...values,
          email: decodeToken.email,
          name: decodeToken.name
        });
      }
    }
  }, []);
  return [error, setError, values];
};

export default useDecodeToken;
