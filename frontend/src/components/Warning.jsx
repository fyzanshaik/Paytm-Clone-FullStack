import { Link } from "react-router-dom";

export function Warning() {
    return (
        <div className="flex flex-col-2 justify-center">
            <div className="">
                Already have an account?
            </div>
            <Link to="/signin" className="px-1 pointer underline pl-1 cursor-pointer">Sign in</Link>
        </div>

    )
}