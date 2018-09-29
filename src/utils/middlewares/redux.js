export const UPDATE_LOCAL_STORAGE = "UPDATE_LOCAL_STORAGE";
export const REMOVE_LOCAL_STORAGE = "REMOVE_LOCAL_STORAGE";
export const FLUSH = "FLUSH";
export const flush = () => ({ type: FLUSH });

export const updateLocalStorageAction = () => ({ type: UPDATE_LOCAL_STORAGE });
export const asyncRemoveLocalStorageAction = () => ({
    type: REMOVE_LOCAL_STORAGE
});
