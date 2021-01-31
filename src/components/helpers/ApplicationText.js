import { store } from "../../store/store";

export const ApplicationText = text => {
    const storeRules = store.getState().textReducer.texts;

    return storeRules[text]
}