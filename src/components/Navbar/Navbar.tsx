"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    return (
        <nav className="bg-blue-400 px-4 ">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-2xl font-bold">
                وقاية 
                </Link>
                <div className="flex items-center justify-between gap-5 space-x-4">
                    <Link
                        href="/booking"
                        className={`text-white font-semibold hover:text-gray-200 ${isActive("/booking")? "text-gray-200" : ""}`}
                    >
                        الحجز
                    </Link>
                    <Link
                        href="/queues"
                        className={`text-white font-semibold hover:text-gray-200 ${isActive("/queues")? "text-gray-200" : ""}`}
                    >
                        طوابير المرضى
                    </Link>
                    <Link
                        href="/registeration"
                        className={`text-white font-semibold p-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors`}
                    >
                        تسجيل دخول
                    </Link>
                </div>
            </div>
        </nav>
    );
}