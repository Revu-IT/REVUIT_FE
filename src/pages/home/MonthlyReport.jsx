import React from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as M from "../../styles/MonthlyReportStyle";

import Header from "../../components/HeaderBack";
import DepartmentCard from "../../components/DepartmentCard";
import { DEPARTMENTS } from "../../utils/departmentsMap";

function MonthlyReport() {
    const navigate = useNavigate();

    const handleHome = () => navigate("/home");

    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace bg="#f3f4f7">
                        <Header />
                        <M.Report>
                            <M.Container>
                                {DEPARTMENTS.map((dept) => (
                                    <li
                                        key={dept.id}
                                        style={{ listStyle: "none" }}
                                    >
                                        <DepartmentCard
                                            id={dept.id}
                                            en={dept.en}
                                        />
                                    </li>
                                ))}
                            </M.Container>
                            <M.Button onClick={handleHome}>메인으로</M.Button>
                        </M.Report>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default MonthlyReport;
