import React, {useEffect, useState} from 'react';
import axios from "axios";

const UserPage = ({match}) => {

  const [user, setUser] = useState(undefined);
  useEffect(() => {
    axios.get('/users/' + match.params.username)
      .then(response => setUser(response.data))
      .catch(() => setUser(null))
  })

  return (
    user === undefined ? <div>Loading...</div> :
      user === null ? <div>No user found</div> :
        <div>
          <h1>{user.username}</h1>
          <div>messages sent: {user.messagesSent}</div>
          <div>registrations date: {user.registrationDate}</div>
        </div>
  );
};

export default UserPage;
