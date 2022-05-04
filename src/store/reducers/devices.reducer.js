const devicesReducer = (state = {devices: [], loading: false}, action) => {
    switch (action.type) {
        case 'add':
            console.log('in store add');
            return { devices: addDeviceHandler(action.deviceData, state), loading: state.loading };
        case 'update':
            console.log('in store update');
            return { devices: updateDeviceHandler(action.deviceData, state), loading: state.loading };
        case 'fetchAll':
            console.log('in fetch all');
            return { devices: getDevices(), loading: state.loading };
        default: return state;
    }
};

export default devicesReducer;

function addDeviceHandler(deviceData, currentState) {
    fetch(
        'https://device-inventory-67487-default-rtdb.firebaseio.com/devices.json',
        {
            method: 'POST',
            body: JSON.stringify(deviceData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
        return currentState.concat(deviceData);
    });
}

function updateDeviceHandler(deviceData, state) {
    const keyId = state[state.findIndex(x => x.deviceId === deviceData.deviceId)].id;
    fetch(
        `https://device-inventory-67487-default-rtdb.firebaseio.com/devices/${keyId}.json`,
        {
            method: 'PATCH',
            body: JSON.stringify(deviceData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
        const newList = [...state];
        const index = newList.findIndex(x => x.deviceId === deviceData.deviceId);
        newList[index] = deviceData;
        return newList;
    });
}

function getDevices() {
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
                return devices;
            });
        });
}