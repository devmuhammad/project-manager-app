

export const BaseApi = {
  URL: 'https://comsoftltd.net:9090/projappapi/',
  // URL: 'http://localhost:8080/projappapi/',
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
    PROJECT_MANAGER: 'project/managersbyproject',
    // PROJECT TYPES
    PROJECT_TYPES: 'project/projecttypes',
    PROJECT_TYPE_ADD: 'project/projecttype/add',
    PROJECT_TYPE_UPDATE: 'project/projecttype/update',
    PROJECT_TYPE_DELETE: 'project/projecttype/delete',
    // Activity
    ASSIGNEE_ACTIVITIES: 'activities/assignee',
    LIST_ACTIVITIES:'activities/list/all',
    ADD_ACTIVITIES:'activities/add',
    DELETE_ACTIVITIES:'activities/delete/',
    ACTIVITIES_BY_PROJECT: 'activities/retrievebyproject',
    // Conversations
    ADD_USER_CONVERSATION: 'conversation/add',
    ADD_PROJECT_CONVERSATION: 'conversation/addgroup',
    ADD_GENERAL_CONVERSATION: 'conversation/addgeneral',
    PROJECT_CONVERSATION: 'conversation/group/conversation/project',
    GENERAL_CONVERSATION: 'conversation/general/conversation',
    USER_CONVERSATION: 'conversation/conversation/user',
    DELETE_CONVERSATION: 'conversation/delete',
    // Tasks Type
    TASK_TYPE_ADD : 'project/tasktype/add',
    TASK_TYPE_UPDATE: 'project/tasktype/update',
    TASK_TYPES: 'project/tasktypes',
    // Tasks
    TASK_ADD: 'task/add',
    TASK_LIST: 'task/tasklist',
    TASK_INITIATOR: 'task/initiator',
    TASK_DOCUMENT: 'task/documents',
    TASK_HISTORY: 'task/history',
    TASK_ASSIGNEE: 'task/assignee',
    TASK_UPDATE: 'task/update',
    TASK_BYPROJECT: 'task/retrievebyproject',
    // Documents
    DOC_UPDATE: 'document/update',
    DOC_RETRIEVE: 'document/retrieve',
    DOC_PREVIEW: 'document/filepreview',
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
    CLIENTS: 'project/clients/all',

    // Team Members
    TEAM_MEMBERS: 'project/teammembers',
    // PROJECT ACTIVITY

    // Reasons
    ADD_REASON: 'reason/add',
    UPDATE_REASON: 'reason/update',
    LIST_REASONS: 'reason/list/all',
    DELETE_REASON: 'reason/delete',
   
    // REPO
    ADD_REPO: 'repo/add',
    ADD_BRANCH_REPO: 'repo/addbranch',
    REPO_LIST: 'repo/list',
    REPO_BRANCH_LIST: 'repo/branch/list',
    REPO_BRANCH_UPDATE: 'repo/branch/update',
    REPO_UPDATE: 'repo/update',

    // SERVERS
    // SERVER CREDENTIALS
    SERVER_CREDENTIAL_LIST: 'server/servercredential/list/all',
    SERVER_CREDENTIAL_PROJECT: 'server/servercredentials/retrievebyproject',
    ADD_SERVER_CREDENTIAL: 'server/add/servercredentials',
    UPDATE_SERVER_CREDENTIAL: 'server/update/servercredentials',
    DELETE_SERVER_CREDENTIAL: 'server/servercredentials/delete',

    // SERVER ACCOUNT
    SERVER_ACCOUNT_LIST: 'server/serveraccount/list/all',
    SERVER_ACCOUNT_PROJECT: 'server/serveraccount/retrievebyproject',
    ADD_SERVER_ACCOUNT: 'server/add/serveraccount',
    UPDATE_SERVER_ACCOUNT: 'server/update',
    DELETE_SERVER_ACCOUNT: 'server/serveraccount/delete',

    // SERVER 
    SERVER_TOOLS_LIST: 'server/servertool/list/all',
    SERVER_TOOL_PROJECT: 'server/servertool/retrievebyproject',
    ADD_SERVER_TOOL: 'server/add/servertool',
    UPDATE_SERVER_TOOL: 'server/update/servertool',
    DELETE_SERVER_TOOL: 'server/servertool/delete'
  }
};



export const ROLES = {
ADMIN: 'ADMIN',
TRUST: 'TRUST',
USER: 'USER',
NOTIFICATION: 'Notification',
CLIENT: 'CLIENT',
SUPERVISOR: 'SUPERVISOR'
}