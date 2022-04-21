import './App.css';
import DeviceTable from "./components/DeviceTable";

import { Route, Switch, useHistory } from 'react-router-dom'
import DeviceDetails from "./components/DeviceDetails";
import {useEffect, useState} from "react";

function App() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getDataFromDb();
    }, []);

    function getDataFromDb() {
        return fetch(
            'https://device-inventory-67487-default-rtdb.firebaseio.com/devices.json')
            .then(response => {
                return response.json().then(data => {
                    const devices = [];
                    for (const key in data) {
                        const newDevice = {
                            id: key,
                            ...data[key]
                        };

                        devices.push(newDevice)
                    }
                    setIsLoading(false);
                    setTableData(devices);
                    return devices
                });
            });
    }

    function addNewDeviceHandler(deviceData) {
            fetch(
                'https://device-inventory-67487-default-rtdb.firebaseio.com/devices.json',
                {
                    method: 'POST',
                    body: JSON.stringify(deviceData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                history.replace('/');
            });
    }

    function updateDeviceHandler(deviceData) {
       getDataFromDb().then((objs) => {
                const index = objs.findIndex(x => x.deviceId === deviceData.deviceId);
                const keyId = objs[index].id;
                fetch(
                    `https://device-inventory-67487-default-rtdb.firebaseio.com/devices/${keyId}.json`,
                    {
                        method: 'PATCH',
                        body: JSON.stringify(deviceData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                    history.replace('/');
                });
        });

    }

    if(isLoading) {
        return <section><p>Loading...</p></section>
    }

    return (
        <div>
            <div>
                <img src={require('./images/lt.jpeg')} alt="logo"/>
            </div>
            <Switch>
                <Route path='/' exact={true}>
                    <DeviceTable tableData={tableData}/>
                </Route>
                <Route path='/view/:id'>
                    <DeviceDetails updateDeviceDetails={updateDeviceHandler} createMode={false}/>
                </Route>
                <Route path='/create'>
                    <DeviceDetails addDevice={addNewDeviceHandler} createMode={true}/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
