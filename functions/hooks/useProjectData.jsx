import { useState, useMemo } from 'react';
import { getProjectAction } from '../fetches/projects/projectActions';
import { getEmployeesAction } from '../fetches/employees/employeeActions';
import { getUsersAction } from '../fetches/users/userActions';

const useProjectData = (initialProject, initialEmployees, initialUsers) => {
    const [project, setProject] = useState(initialProject);
    const [employees, setEmployees] = useState(initialEmployees);
    const [users, setUsers] = useState(initialUsers);
    const [loading, setLoading] = useState(!initialProject || !initialEmployees);

    const loadProjectData = async (projectId) => {
        setLoading(true);
        const [updatedProject, updatedEmployees, updatedUsers] = await Promise.all([
            getProjectAction(projectId),
            getEmployeesAction(),
            getUsersAction()
        ]);
        setProject(updatedProject);
        setEmployees(updatedEmployees);
        setUsers(updatedUsers);
        setLoading(false);
    };

    const memoizedProject = useMemo(() => project, [project]);
    const memoizedEmployees = useMemo(() => employees, [employees]);
    const memoizedUsers = useMemo(() => users, [users]);

    return { project: memoizedProject, employees: memoizedEmployees, users: memoizedUsers, loading, loadProjectData };
};

export default useProjectData;