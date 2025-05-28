"use client";
import {zodResolver} from "@hookform/resolvers/zod"
import {DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn} from "react-hook-form";
import {ZodType} from "zod";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthFormProps<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
    type: "SIGN_IN" | "SIGN_UP";
};

const AuthForm = <T extends FieldValues>({type, schema, defaultValues, onSubmit,} : AuthFormProps<T>) => {
    const router = useRouter();

    const isSignIn = type === "SIGN_IN";
    // 1. Define your form.
    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    })

    // 2. Define a submit handler.
    const handleSubmit: SubmitHandler<T> = async (data) => {
        const result = await onSubmit(data);

        if (result.success){
            toast("Success", {
                description: isSignIn ? "You have successfully signed in" : "You have successfully signed up",
                // variant: "destructive",
                // action: {
                //   label: "Retry",
                //   onClick: () => console.log("Retry"),
                // },
              });
              router.push("/");
        }else{
            toast(`Error ${isSignIn ? "Signing In" : "Signing Up"}`, {
                description: result.error ?? "Something went wrong",
                // variant: "destructive",
                // action: {
                //   label: "Retry",
                //   onClick: () => console.log("Retry"),
                // },
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-white">{isSignIn ? "Welcome back to Bookwise" : "Create your library account"}</h1>
            <p>
                {isSignIn ? "Access the vast collection of resources and stay updated" : "Please, complete all fields and upload a valid university ID to gain access to the library"}
            </p>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
                {Object.keys(defaultValues).map((field) => (
                    <FormField
                    key={field}
                    control={form.control}
                    name= {field as Path<T>}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="capitalize">
                                {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                            </FormLabel>
                            <FormControl>
                                {field.name === "universityCard" ? (
                                    <ImageUpload onFileChange ={field.onChange}/>
                                ) : (
                                    <Input required type = {FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field} className="form-input"/>
                                )}
                            </FormControl>
                            {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                ))}
                
                <Button type="submit" className="form-btn">
                    {isSignIn ? "Sign In" : "Sign up"}
                </Button>
            </form>
        </Form>
        <p className="text-center text-base font-semibold">
            {isSignIn ? "New to BookWise? " : "Already have an account? "}

            <Link href={isSignIn ? "/sign-up" : "sign-in"} className="text-primary font-bold">
            {isSignIn ? "Create an Account" : "Sign In"}
            </Link>
        </p>
        </div>
    )
}

export default AuthForm

