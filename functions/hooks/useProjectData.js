import { useState, useMemo } from 'react';
import { getProjectAction } from '../fetches/projects/projectActions';
import { getEmployeesAction } from '../fetches/employees/employeeActions';

const useProjectData = (initialProject, initialEmployees) => {
    const [project, setProject] = useState(initialProject);
    const [employees, setEmployees] = useState(initialEmployees);
    const [loading, setLoading] = useState(!initialProject || !initialEmployees);

    const loadProjectData = async (projectId) => {
        setLoading(true);
        const [updatedProject, updatedEmployees] = await Promise.all([
            getProjectAction(projectId),
            getEmployeesAction()
        ]);
        setProject(updatedProject);
        setEmployees(updatedEmployees);
        setLoading(false);
    };

    const memoizedProject = useMemo(() => project, [project]);
    const memoizedEmployees = useMemo(() => employees, [employees]);

    return { project: memoizedProject, employees: memoizedEmployees, loading, loadProjectData };
};

export default useProjectData;