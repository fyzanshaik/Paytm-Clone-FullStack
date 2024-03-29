import { useNavigate } from "react-router-dom";



// eslint-disable-next-line react/prop-types, no-unused-vars
const AppBar = ({ userName }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col-3 justify-between border border-slate-300">
            <div className="text-3xl px-3 font-bold pt-2 p-3">Payments App</div>
            <div className="text-2xl pt-3 px-3 font-light flex flex-col-3">Hello, {userName}</div>
            <button onClick={() => {
                localStorage.clear();
                navigate("/signin")
            }} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign Out</button>
        </div>
    )
}

export default AppBar