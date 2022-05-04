import { createStore } from 'redux';
import rootReducer from "./reducers/rootReducer";

const devicesStore = createStore(rootReducer);

export default devicesStore;