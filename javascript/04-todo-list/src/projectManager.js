const projectManager = (()=>{
    const projects = [];
    let currentProject = null;

    function getProjects()
    {
        return projects;
    }

    function getCurrentProject()
    {
        return currentProject;
    }

    return{
        getProjects,
        getCurrentProject
    }

})();

export default projectManager;