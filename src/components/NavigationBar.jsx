import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as N from "../styles/components/NavigationBarStyle";

import home from "../assets/images/home.svg";
import homeSelected from "../assets/images/home_selected.svg";
import competitor from "../assets/images/competitor.svg";
import competitorSelected from "../assets/images/competitor_selected.svg";
import keyword from "../assets/images/keyword.svg";
import keywordSelected from "../assets/images/keyword_selected.svg";
import department from "../assets/images/department.svg";
import departmentSelected from "../assets/images/department_selected.svg";
import mypage from "../assets/images/mypage.svg";
import mypageSelected from "../assets/images/mypage_selected.svg";

function NavigationBar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const navItems = [
        {
            label: "홈",
            path: "/home",
            icon: home,
            iconSelected: homeSelected,
        },
        {
            label: "경쟁사별",
            path: "/competitor",
            icon: competitor,
            iconSelected: competitorSelected,
        },
        {
            label: "키워드별",
            path: "/keyword",
            icon: keyword,
            iconSelected: keywordSelected,
        },
        {
            label: "부서별",
            path: "/department",
            icon: department,
            iconSelected: departmentSelected,
        },
        {
            label: "마이페이지",
            path: "/mypage",
            icon: mypage,
            iconSelected: mypageSelected,
        },
    ];

    return (
        <N.Nav>
            {navItems.map((item) => {
                const selected = pathname.startsWith(item.path);
                return (
                    <N.NavItem
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        selected={selected}
                    >
                        <img
                            src={selected ? item.iconSelected : item.icon}
                            alt={item.label}
                        />
                        {item.label}
                    </N.NavItem>
                );
            })}
        </N.Nav>
    );
}

export default NavigationBar;
