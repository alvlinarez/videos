import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const useDecodeToken = (token) => {
  const [values, setValues] = useState({
    name: '',
    email: ''
  });
  const [errorToken, setErrorToken] = useState(null);
  useEffect(() => {
    if (token) {
      const decodeToken = jwt.decode(token);
      if (!decodeToken) {
        setErrorToken('Invalid token.');
      } else {
        setValues({
          ...values,
          email: decodeToken.email,
          name: decodeToken.name
        });
      }
    }
  }, []);
  return [errorToken, setErrorToken, values];
};

export default useDecodeToken;
