import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
function SignIn() {
    const navigate = useNavigate();
    const [userName,setUsername] = useState("");
    const [password,setPassword] = useState("");
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-4 h-max px-2">
                    <Heading text={"Sign In"}></Heading>
                    <InputBox onChange={(e)=>setUsername(e.target.value)} label={"Email"} placeholder={"johndoe@example.com"}></InputBox>
                    <InputBox onChange={e=>setPassword(e.target.value)} label={"Password"} placeholder={"123456"}></InputBox>
                    <Button onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                userName,
                                password
                            });
                            localStorage.setItem("token", response.data.jwt);
                            navigate("/dashboard");
                        } catch (error) {
                            if (error.response) {
                                console.error("Server error:", error.response.data);
                            } else if (error.request) {
                                console.error("No response received:", error.request);
                            } else {
                                console.error("Error:", error.message);
                            }
                        }}} text={"Sign In"}></Button>
                </div>
            </div>
            

        </div>
    )
}

export default SignIn