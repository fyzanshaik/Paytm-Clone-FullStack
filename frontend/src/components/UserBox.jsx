import { useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
const UserBox = ({ id, firstName, lastName, userName, _id }) => {
    return (
        <div className="flex flex-col-2 justify-between p-2 hover:bg-slate-100">
            <div className="flex ">
                <div className="p-3 pt-4">{id + 1}</div>
                <div className="p-3 text-lg font-medium">{firstName} {lastName}</div>
                <div className="p-4 pt-4 text-sm font-dark font-slate-100">@{userName}</div>
            </div>
            <Button1 text={"Send Money"} id={_id} userName={userName}></Button1>
        </div>
    )
}

const Button1 = ({ text,id, userName }) => {
    const navigate = useNavigate();
    return (
        <button onClick={() => {
            navigate("/send?id=" + id + "&name=" + userName)
        }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {text}
        </button>
    )
}

export default UserBox