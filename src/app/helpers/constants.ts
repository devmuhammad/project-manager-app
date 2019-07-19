export const BaseApi = {
  URL: 'http://comsoftltd.net:9090/projappapi/',
  PATH: {
    LOGIN: 'entrance/user/signin',
    RESET_PASSWORD: 'entrance/password-reset',
    GET_TOKEN: 'super/tokens',
    SIGNUP: 'users/signup',
    USERS: 'users/user/list',
    DELETE: 'users/user/delete',
    SIGNUPREQUEST: 'users/user/signup/request',
    SIGNUPAPPROVAL: 'users/user/signup/approval',
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
