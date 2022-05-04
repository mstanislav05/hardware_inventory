import {Route, Switch} from "react-router-dom";
import DeviceTable from "./DeviceTable";
import DeviceDetails from "./DeviceDetails";
import {useSelector} from "react-redux";


export default function AppComponent() {
    const devices = useSelector(state => state.devices);
    const isLoading = useSelector(state => state.loading);

    if(isLoading) {
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
                        <DeviceTable tableData={devices}/>
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