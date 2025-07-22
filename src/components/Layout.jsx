import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Layout() {
    const { pathname } = useLocation();

    const hiddenPaths = [
        "/splash",
        "/signin",
        "/signup",
        "/notification",
        "/mypage/profileSettings",
    ];
    const shouldHideNav =
        hiddenPaths.includes(pathname) || pathname.startsWith("/keywords");

    return (
        <>
            <Outlet />
            {!shouldHideNav && <NavigationBar />}
        </>
    );
}
