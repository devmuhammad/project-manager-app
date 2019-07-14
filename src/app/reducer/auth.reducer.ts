const initalState ={
  data:{},
  isLoggedIn:false,
}
export const auth = (state = initalState, action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      return {
        ...state,
        data:action.payload,
        isLoggedIn:true
      };
    default:
      return state;
  }
}
