// set in localstorage
export const setLocalstorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage
export const removeLocalstorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
