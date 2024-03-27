import axios from "axios"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { Warning } from "../components/Warning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-4 h-max px-2">
                    <Heading text={"Sign Up"}></Heading>
                    <SubHeading text={"Enter your information to create an account"}></SubHeading>
                    <InputBox onChange={(e) => {
                        setFirstName(e.target.value)
                    }} label={"First Name"} placeholder={"John"} ></InputBox>
                    <InputBox onChange={(e) => {
                        setLastName(e.target.value)
                    }} label={"Last Name"} placeholder={"Doe"}></InputBox>
                    <InputBox onChange={(e) => {
                        setUsername(e.target.value)
                    }} label={"Email"} placeholder={"johndoe@example.com"}></InputBox>
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                    }} label={"Password"} placeholder={"123456"}></InputBox>
                    <Button onClick={async () => {
                        console.log("button was clicked ")
                        console.log(firstName)
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                firstName,
                                lastName,
                                userName,
                                password
                            });
                            localStorage.setItem("token", response.data.jwt);
                            console.log(response.data)
                            navigate("/dashboard");
                        } catch (error) {
                            if (error.response) {
                                console.error("Server error:", error.response.data);
                            } else if (error.request) {
                                console.error("No response received:", error.request);
                            } else {
                                console.error("Error:", error.message);
                            }
                        }
                    }} text={"Sign Up"}>signup</Button>
                    <Warning></Warning>
                </div>
            </div>

        </div>
    )
}



export default SignUp



