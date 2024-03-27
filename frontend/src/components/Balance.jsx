
// eslint-disable-next-line react/prop-types, no-unused-vars
const Balance = ({balance}) =>{
    return (
        <div className="flex flex-col-2 p-4">
            <div className="font-medium text-2xl px-1">Your Balance</div>
            <div className="px-3  font-bold text-2xl"> $ {balance}</div>
        </div>
    )
}

export default Balance