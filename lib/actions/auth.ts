"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../rateLimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  // Adding ratelimit;
const ip = (await headers().get("x-forwarded-for") || "127.0.0.1");
const {success} = await ratelimit.limit(ip)
if (!success){
  return redirect("/too-fast")
};

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityCard, universityId } = params;

// Adding ratelimit;
const ip = (await headers().get("x-forwarded-for") || "127.0.0.1");
const {success} = await ratelimit.limit(ip)
if (!success){
  return redirect("/too-fast")
};

  // check if the user already exist;
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, message: "User already exists" };
  }

  //   Create a new user
  const hashedPassword = await hash(password, 10);
  try {
    await db.insert(users).values({
      // insert the values you want to insert;
      fullName,
      email,
      universityId,
      universityCard,
      password: hashedPassword,
    });

    await signInWithCredentials({ email, password });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.log(error, "SignUp error");
    return { success: false, message: "SignUp error" };
  }
};
