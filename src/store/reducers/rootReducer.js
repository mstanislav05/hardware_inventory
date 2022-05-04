import { combineReducers } from 'redux';
import devicesReducer from "./devices.reducer";

const rootReducer = combineReducers({
    devices: devicesReducer,
});

export default rootReducer;