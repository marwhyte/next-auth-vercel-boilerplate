import { NextRequest, NextResponse } from "next/server";

import { addUser, getUserByEmail } from "@/lib/database/queries/users";

import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  };
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return new NextResponse("This user already exists, try signing in", {
        status: 409,
      });
    }
    await addUser(newUser);
  } catch (e) {
    console.log(e);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
