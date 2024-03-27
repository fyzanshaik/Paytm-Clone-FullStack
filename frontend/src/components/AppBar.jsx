


// eslint-disable-next-line react/prop-types, no-unused-vars
const AppBar = ({ userName }) => {
    return (
        <div className="flex flex-col-2 justify-between border border-slate-300">
            <div className="text-3xl px-3 font-bold pt-2 p-3">Payments App</div>
            <div className="text-2xl pt-3 px-3 font-light flex flex-col-2">Hello, {userName}</div>
        </div>
    )
}

export default AppBar