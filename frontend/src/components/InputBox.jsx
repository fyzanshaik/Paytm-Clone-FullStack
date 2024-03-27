// eslint-disable-next-line react/prop-types
export function InputBox({ label, placeholder ,onChange}) {
    return (
        <div className="py-2 text-left font-medium">
            <label className="">{label}</label><br></br>
            <input onChange={onChange} className="text-sm rounded-lg border border-grey-300  block w-full p-2.5" type="text" placeholder={placeholder} />
        </div>
    )
}