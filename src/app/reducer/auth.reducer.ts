

const initalState ={
  data:{},
  isLoggedIn:false,
  groups:[]
}
export const auth = (state = initalState, action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      return {
        ...state,
        data:action.payload,
        isLoggedIn:true
      };
      case 'GET_GROUPS':
        return{
            ...state,
            groups:[...state.groups,action.payload]
        }
      case 'LOGOUT':
        return state = initalState;

    default:
      return state;
  }
}
