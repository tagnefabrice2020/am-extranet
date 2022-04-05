import React from "react"
import {AppContent, AppSidebar, AppNavbar, AppFooter, AppControlBar} from "../components/index"

const DefaultLayout = () => {
    return (
        <div className="wrapper">
            <AppNavbar />
            <AppSidebar />
            <AppContent />
            <AppFooter />
            <AppControlBar />
        </div>
    )
}

export default DefaultLayout