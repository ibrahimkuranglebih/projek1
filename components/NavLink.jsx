"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { use } from "react";

export default function NavLink({href, children}){
    const path = usePathname();
    const active = href == path;

    return (
        <Link className= {active? "font-bold" : ""}href={href}>{children}</Link>
    )
}