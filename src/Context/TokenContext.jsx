import { createContext, useEffect, useState } from 'react';

export let TokenContext = createContext();

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || ''
  );

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setToken(localStorage.getItem('userToken'));
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken, userName, setUserName }}>
      {props.children}
    </TokenContext.Provider>
  );
}
