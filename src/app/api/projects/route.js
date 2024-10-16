import { NextResponse } from "next/server";
import ProjectsController from "/controllers/project.controller";

const projectsController = new ProjectsController();


export async function GET(req) {
    try {
        const projects = await projectsController.getProjects();
console.log(projects)
        if (!projects || projects.length === 0) {
            return NextResponse.json({ message: 'Projects not found' }, { status: 404 });
        }

        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.error('Error while getting projects:', error);
        return NextResponse.json({ message: 'Error while getting projects' }, { status: 500 });
    }
}

/*
export async function POST(req) {
    try {
        const projectData = await req.json();
        const newProject = await projectsController.createProject(projectData);

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error('Error while creating project:', error);
        return NextResponse.json({ message: 'Error while creating project' }, { status: 500 });
    }
}


export async function PUT(req) {
    try {
        const { id_projects, ...updatedData } = await req.json();
        const updatedProject = await projectsController.updateProject(id_projects, updatedData);

        if (!updatedProject) {
            return NextResponse.json({ message: 'Project not found or not updated' }, { status: 404 });
        }

        return NextResponse.json(updatedProject, { status: 200 });
    } catch (error) {
        console.error('Error while updating project:', error);
        return NextResponse.json({ message: 'Error while updating project' }, { status: 500 });
    }
}


export async function DELETE(req) {
    try {
        const { id_projects } = await req.json();
        const isDeleted = await projectsController.deleteProject(id_projects);

        if (!isDeleted) {
            return NextResponse.json({ message: 'Project not found or not deleted' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error while deleting project:', error);
        return NextResponse.json({ message: 'Error while deleting project' }, { status: 500 });
    }
        
}*/
