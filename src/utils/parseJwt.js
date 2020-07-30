// function to decode jwt
export default (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return { error: e };
  }
};
