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
  }
}
