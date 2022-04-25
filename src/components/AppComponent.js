import {useContext} from "react";
import DevicesContext from "../store/devices-context";
import {Route, Switch} from "react-router-dom";
import DeviceTable from "./DeviceTable";
import DeviceDetails from "./DeviceDetails";

export default function AppComponent() {
    const deviceContext = useContext(DevicesContext);

    if(deviceContext.loadingState) {
        return (
            <section>
                <p>
                    Loading....
                </p>
            </section>
        )
    }
    return (
        <div>
            <Switch>
                <Route path='/' exact={true}>
                    <DeviceTable tableData={deviceContext.devices}/>
                </Route>
                <Route path='/view/:id'>
                    <DeviceDetails createMode={false}/>
                </Route>
                <Route path='/create'>
                    <DeviceDetails createMode={true}/>
                </Route>
            </Switch>
        </div>
    );
}