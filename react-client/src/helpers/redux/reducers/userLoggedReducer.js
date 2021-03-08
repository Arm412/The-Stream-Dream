const userLoggedReducer = (state = false, action) => {
  switch(action.type) {
    case 'LOGIN':
      return !state;
    case 'LOGOUT':
      return !state;
    default:
      return false;
  }
}

export default userLoggedReducer;