import { useEffect, useState } from "react";
import UserBox from "./UserBox";
import axios from "axios";

const UserList = () => {
    // eslint-disable-next-line no-unused-vars
    const [filter,setFilter] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const config = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            };
            axios.get("http://localhost:3000/api/v1/user/bulk", config)
                .then(response => {
                    setAllUsers(response.data.ALL_USERS);
                    setFilteredUsers(response.data.ALL_USERS);
                })
                .catch(err => console.log(err));
        } else {
            console.error("Token not found in localStorage");
        }
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setFilter(value);

        const filtered = allUsers.filter(user =>
            user.userName.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredUsers(filtered);
    };

    return (
        <div className="">
            <input
                onChange={handleSearchChange}
                type="text"
                placeholder="Search Users..."
                className="border border-slate-300 p-8 py-4 w-5/6 rounded-full"
            />
            <div className="">
                {filteredUsers.map((user, id) => (
                    <UserBox key={id} userName={user.userName} _id={user._id} firstName={user.firstName} lastName={user.lastName} id={id} />
                ))}
            </div>
        </div>
    );
}

export default UserList;
