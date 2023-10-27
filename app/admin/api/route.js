import { getData } from "@/GlobalRedux/APIs/firebaseAPI";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const userList = await getData("user");
  return NextResponse.json(userList);
}
