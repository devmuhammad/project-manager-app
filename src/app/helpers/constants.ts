export const BaseApi = {
  URL: 'http://comsoftltd.net:9090/projappapi/',
  PATH: {
    LOGIN: 'entrance/user/signin',
    RESET_PASSWORD: 'entrance/password-reset',
    GET_TOKEN: 'super/tokens',
    SIGNUP: 'users/signup',
    USERS: 'users/user/list',
    ADD_USER: 'users/user/add',
    UPDATE_USER: 'users/user/update',
    DELETE: 'users/user/delete',
    ROLES: 'users/role/list',
    SIGNUPREQUEST: 'users/user/signup/request',
    SIGNUPAPPROVAL: 'users/user/signup/approval',
    ACTIVATION: 'users/user/activate-diactivate',
    APPROVE_USER: 'users/user/signup/approval',
    // GROUP
    GROUPLIST: 'users/group/list',
    ADD_GROUP: 'users/group/add',
    UPDATE_GROUP: 'users/group/update',
    DELETE_GROUP: 'users/group/delete',
    // dropdowns
    INSTITUTIONS: 'users/institutions',
    DESIGNATIONS: 'users/designations',
    // Projects
    ADD_PROJECTS: 'project/add',
    PROJECTS: 'project/list',
    PROJECT_UPDATE: 'project/update',
    PROJECTS_RETRIEVE: 'project/retrieve',
    // PROJECT TYPES
    PROJECT_TYPES: 'project/projecttypes',
    PROJECT_TYPE_ADD: 'project/projecttype/add',
    PROJECT_TYPE_UPDATE: 'project/projecttype/update',
    PROJECT_TYPE_DELETE: 'project/projecttype/delete',
    // Tasks
    TASK_TYPE_ADD : 'project/tasktype/add',
    TASK_TYPE_UPDATE: 'project/tasktype/update',
    TASK_TYPES: 'project/tasktypes',
    // Documents
    Documents: 'project/documents',
    DOC_UPDATE: 'project/document/update',
    DOC_RETRIEVE: 'project/document/retrieve',
    DOC_ADD: 'project/document/add',

    // STATUS
    ADD_STATUS: 'project/status/add',
    UPDATE_STATUS: 'project/status/update',
    STATUS: 'project/status',
   // DOCTYPE
    DOC_TYPE : 'project/documenttype',
    DOC_TYPE_ADD : 'project/documenttype/add',
    DOC_TYPE_UPDATE : 'project/documenttype/update',
    DOC_TYPE_DELETE : 'project/documenttype/delete',
    DOC_TYPE_RETRIEVE: 'project/documenttype/retrieve',
    // add clients
    ADD_CLIENTS: 'project/client/add',
    DELETE_CLIENT: 'project/client/delete',
    RETRIEVE_CLIENT: 'project/client/retrieve',
    UPDATE_CLIENT: 'project/client/update',
    CLIENTS: 'project/clients'
  }
};

