import { createContext, useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';

export let TokenContext = createContext();

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || ''
  );
  // let { userId, setUserId } = useContext(CartContext);
  //  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

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
