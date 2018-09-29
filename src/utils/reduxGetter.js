import { store } from "src/store";

export const reduxGetter = (getter, _default = null) => {
    try {
        return getter(store.getState());
    } catch (error) {
        return _default;
    }
};

window.reduxSelect = reduxGetter;
