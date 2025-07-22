import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Splash from "./pages/user/Splash";
import Onboarding from "./pages/user/Onboarding";
import Signin from "./pages/user/Signin";
import Signup from "./pages/user/Signup";
import Home from "./pages/home/Home";
import Notification from "./pages/home/Notification";
import Mypage from "./pages/user/Mypage";
import ProfileSettings from "./pages/user/ProfileSettings";
import Competitor from "./pages/competitor/Competitor";
import CompetitorLike from "./pages/competitor/CompetitorLike";
import CompetitorDislike from "./pages/competitor/CompetitorDislike";
import CompetitorKeyword from "./pages/competitor/CompetitorKeyword";
import Keyword from "./pages/keyword/Keyword";
import KeywordStrength from "./pages/keyword/KeywordStrength";
import KeywordWeakness from "./pages/keyword/KeywordWeakness";
import KeywordDetail from "./pages/keyword/KeywordDetail";
import Department from "./pages/department/Department";
import DepartmentDetail from "./pages/department/DepartmentDetail";
import DepartmentHelp from "./pages/department/DepartmentHelp";
import MonthlyReport from "./pages/home/MonthlyReport";
import MonthlyKeyword from "./pages/home/MonthlyKeyword";
import Layout from "./components/Layout";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* 네비게이션바X */}
                <Route path="/" element={<Splash />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/notification" element={<Notification />} />
                <Route
                    path="/mypage/profileSettings"
                    element={<ProfileSettings />}
                />
                <Route path="/keyword" element={<Keyword />} />
                <Route path="/keyword/strength" element={<KeywordStrength />} />
                <Route path="/keyword/weakness" element={<KeywordWeakness />} />
                <Route path="/keyword/:id/detail" element={<KeywordDetail />} />
                <Route path="/monthly/report" element={<MonthlyReport />} />
                <Route path="department/help" element={<DepartmentHelp />} />

                {/* 네비게이션바O */}
                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/competitor" element={<Competitor />} />
                    <Route
                        path="/competitor/like"
                        element={<CompetitorLike />}
                    />
                    <Route
                        path="/competitor/dislike"
                        element={<CompetitorDislike />}
                    />
                    <Route
                        path="/competitor/keyword"
                        element={<CompetitorKeyword />}
                    />
                    <Route path="/department" element={<Department />} />
                    <Route
                        path="/department/:id/detail"
                        element={<DepartmentDetail />}
                    />
                    <Route
                        path="/monthly/keyword"
                        element={<MonthlyKeyword />}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
