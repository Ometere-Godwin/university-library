"use client";
import AuthForm from "@/components/AuthForm";
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
            onSubmit={() => {
            }}/>
    )
}

export default SignUp
