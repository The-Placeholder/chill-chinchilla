import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userId, setuserId] = useState(null);
  const [userData, setuserData] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const authResponse = await axios.get('/auth');

        if (authResponse.status === 200) {
          const userId = authResponse.data.id;
          setuserId(userId); // Set userId if auth is successful

          const userResponse = await axios.get(`/users/${userId}`);
          setuserData(userResponse.data);
          console.log('from axios', userResponse.data);
        } else {
          console.error('Authentication failed:', authResponse.status);
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
      }
    };

    if (!userData && userId) {
      getUser();
    }
  }, [userId, userData]);

  return (
    <UserContext.Provider
      value={{ userData, setuserData, userId, setuserId, channel, setChannel }}
    >
      {children}
    </UserContext.Provider>
  );
}
