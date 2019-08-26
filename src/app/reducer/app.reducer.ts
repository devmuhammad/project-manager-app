const initalState = {
    chrome: {parent: '', child: ''}
};
export const appState = (state = initalState, action) => {
    switch (action.type) {
        case 'BREADCHROME':
            return{
              ...state,
              chrome: {...state.chrome, ...action.payload}
            }
      default:
        return state;
    }
  }