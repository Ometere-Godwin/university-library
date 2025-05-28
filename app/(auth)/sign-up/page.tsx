"use client";
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import {signUpSchema} from "@/lib/validation";

function SignUp() {
    return (
        <AuthForm
            type="SIGN_UP"
            schema={signUpSchema}
            defaultValues={{
                email: "",
                password: "",
                universityCard: "",
                universityId: 0,
                fullName: "",
            }}
            onSubmit={signUp}/>
    )
}

export default SignUp
