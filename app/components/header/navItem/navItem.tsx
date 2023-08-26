"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
    icon: JSX.Element;
    title: string;
}



const NavItem = ({ icon, title } : props)  => {
    let currentPath = "";
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        currentPath = window?.location?.pathname;
        setIsActive(currentPath === `/${title}` || (currentPath === `/` && title === `home`));
    }, []);
    const navPath = title === `home` ? `/` : `/${title}`;
    return (
        <div className={`flex justify-end ${isActive && `border-b-2 border-b-buzzhub-yellow`}`}>
            <Link className="hover:bg-gray-200 rounded-md p-2 " href={navPath}>
        {icon}
        <p id="navItemLabel" className="hidden md:block">{title}</p>
    </Link>
        </div>
        
    
    )
}
    


export default NavItem;