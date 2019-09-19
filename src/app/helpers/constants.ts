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
    PROJECT_DOCX: 'project/documents',
    PROJECT_UPDATE: 'project/update',
    PROJECTS_RETRIEVE: 'project/retrieve',
    PROJECT_ACTIVITY: 'project/activities',
    // PROJECT TYPES
    PROJECT_TYPES: 'project/projecttypes',
    PROJECT_TYPE_ADD: 'project/projecttype/add',
    PROJECT_TYPE_UPDATE: 'project/projecttype/update',
    PROJECT_TYPE_DELETE: 'project/projecttype/delete',
    // Activity
    ASSIGNEE_ACTIVITIES: 'activities/assignee',
    LIST_ACTIVITIES:'activities/list',
    ADD_ACTIVITIES:'activities/add',
    DELETE_ACTIVITIES:'activities/delete/',
    // Tasks Type
    TASK_TYPE_ADD : 'project/tasktype/add',
    TASK_TYPE_UPDATE: 'project/tasktype/update',
    TASK_TYPES: 'project/tasktypes',
    // Tasks
    TASK_ADD: 'task/add',
    TASK_LIST: 'task/list',
    TASK_INITIATOR: 'task/initiator',
    TASK_DOCUMENT: 'task/documents',
    TASK_HISTORY: 'task/history',
    TASK_ASSIGNEE: 'task/assignee',
    // Documents
    DOC_UPDATE: 'document/update',
    DOC_RETRIEVE: 'document/retrieve',
    DOC_PREVIEW: 'document/preview',
    DOC_ADD: 'document/add',
    DOCLIST:'document/list',
    DOC_DELETE:'document/delete',
    DOC_UPLOAD: 'document/fileupload',
    DOC_DOWNLOAD:'document/filedownload',


    // STATUS
    ADD_STATUS: 'project/status/add',
    UPDATE_STATUS: 'project/status/update',
    STATUS: 'project/status',
      DELETE_STATUS:'project/status/delete',
   // DOCTYPE
    DOC_TYPE : 'document/documenttypes',
    DOC_TYPE_ADD : 'document/documenttype/add',
    DOC_TYPE_UPDATE : 'document/documenttype/update',
    DOC_TYPE_DELETE : 'document/documenttype/delete',
    DOC_TYPE_RETRIEVE: 'document/documenttype/retrieve',
    // add clients
    ADD_CLIENTS: 'project/client/add',
    DELETE_CLIENT: 'project/client/delete',
    RETRIEVE_CLIENT: 'project/client/retrieve',
    UPDATE_CLIENT: 'project/client/update',
    CLIENTS: 'project/clients',

    // Team Members
    TEAM_MEMBERS: 'project/teammembers',
    // PROJECT ACTIVITY
   

  }
};

