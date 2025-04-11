"use client";

import Link from "next/link";
import SessionI from "@/types/session";
import { signOut } from "next-auth/react";

export default function Header(props: SessionI) {
  const { user } = props;

  return (
    <div className="flex justify-between bg-[var(--headerBg)] pt-[10px] pb-[10px] shadow-[0px_0px_34px_6px_rgba(255,46,88,0.6)] rounded">
      <Link href={"/"} className="p-2">
        <h1 className="text-2xl font-bold text-[#b32e2e] ">Events App</h1>
      </Link>
      <div className="flex">
        <Link href={"/dashboard"} className="p-2">
          Dashboard
        </Link>
        <Link href={"/service/admin"} className="p-2">
          Admin
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex flex-col">
            <p>{user.email}</p>
            <button className="cursor-pointer" onClick={() => signOut()}>
              Wyloguj
            </button>
          </div>
        ) : (
          <div>
            <Link href={"/login"} className="cursor-pointer p-4">
              Zaloguj
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
