import {createContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

const DevicesContext = createContext({
    devices: [],
    addDevice: (deviceData) => {},
    updateDevice: (deviceData) => {},
    loadingState: true
});

export function DevicesContextProvider(props) {
    const [devicesData, setDevicesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        fetch(
            'https://device-inventory-67487-default-rtdb.firebaseio.com/devices.json')
            .then(response => {
                const devices = [];
                response.json().then(data => {
                    for (const key in data) {
                        const newDevice = {
                            id: key,
                            ...data[key]
                        };
                        devices.push(newDevice)
                    }
                    setDevicesData(devices);
                    setIsLoading(false);
                });
            });
    }, [])

    function addDeviceHandler(deviceData) {
        fetch(
            'https://device-inventory-67487-default-rtdb.firebaseio.com/devices.json',
            {
                method: 'POST',
                body: JSON.stringify(deviceData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
            setDevicesData((prevDevices) => {
                return prevDevices.concat(deviceData);
            });
            history.replace('/');
        });
    }

    function updateDeviceHandler(deviceData) {
            const keyId = devicesData[devicesData.findIndex(x => x.deviceId === deviceData.deviceId)].id;
            fetch(
                `https://device-inventory-67487-default-rtdb.firebaseio.com/devices/${keyId}.json`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(deviceData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                setDevicesData(prevDevicesData => {
                    const newList = [...prevDevicesData];
                    const index = newList.findIndex(x => x.deviceId === deviceData.deviceId);
                    newList[index] = deviceData;
                    return newList;
                });
                history.replace('/');
            });
    }

    const context = {
        devices: devicesData,
        addDevice: addDeviceHandler,
        updateDevice: updateDeviceHandler,
        loadingState: isLoading
    }

    return <DevicesContext.Provider value={context}>
        {props.children}
    </DevicesContext.Provider>
}

export default DevicesContext;