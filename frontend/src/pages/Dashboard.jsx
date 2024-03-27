import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import UserList from '../components/UserLIst'
import { useEffect, useState } from 'react';
import axios from 'axios'

function Dashboard() {
    const [userName, setUsername] = useState("User");
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            };
            axios.get("http://localhost:3000/api/v1/user/username", config)
                .then(response => {
                    const userName = response.data.userName;
                    setUsername(userName)
                })
                .catch(err => console.log(err));
            const configGet = {
                headers: {
                    authorization: `Bearer ${token}`
                },
                params: {
                    userName: userName
                }
            }
            axios.get("http://localhost:3000/api/v1/account/balance", configGet)
                .then(response => {
                    const Balance = response.data.Balance;
                    setBalance(Balance);
                })
                .catch(err=>console.log(err))
        } else {
            console.error("Token not found in localStorage");
        }
    })

    return (
        <div className=''>
            <AppBar userName={userName}></AppBar>
            <Balance balance={balance} ></Balance>
            <div className='font-bold text-3xl p-4'>Users</div>
            <UserList></UserList>
        </div>
    )
}

export default Dashboard