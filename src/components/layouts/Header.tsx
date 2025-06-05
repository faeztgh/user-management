import Routes from "@/constants/Routes";
import Link from "next/link";
import React from "react";

const navItems = [
    { label: "List", route: Routes.LIST },
    { label: "Table", route: Routes.TABLE },
];

const Header = () => {
    return (
        <nav className="bg-muted border-b py-8 px-12">
            <ul className="flex justify-start items-center gap-x-5">
                {navItems.map(({ label, route }) => (
                    <li key={label} className="text-xl font-semibold">
                        <Link className="hover:underline" href={route}>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Header;
