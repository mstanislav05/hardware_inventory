import './App.css';
import {DevicesContextProvider} from "./store/devices-context";
import AppComponent from "./components/AppComponent";

function App() {
    return (
        <div>
            <div>
                <img src={require('./images/lt.jpeg')} alt="logo"/>
            </div>
            <DevicesContextProvider>
                <AppComponent>
                </AppComponent>
            </DevicesContextProvider>
        </div>
    );
}

export default App;
