"use client";
import ProjectDashboard from "/components/project/ProjectDashboard";

export default function Project({ params }) {
    return (
        <>
            <ProjectDashboard 
                budget={200000}
                expenses={100000}
            />
        </>
    )
}