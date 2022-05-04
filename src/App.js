import './App.css';
import AppComponent from "./components/AppComponent";
import devicesStore from "./store/devices.store";
import {Provider} from "react-redux";

function App() {
    return (
        <Provider store={devicesStore}>
        <div>
            <div>
                <img src={require('./images/lt.jpeg')} alt="logo"/>
            </div>
                <AppComponent>
                </AppComponent>
        </div>
        </Provider>
    );
}

export default App;
