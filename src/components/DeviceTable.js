import TableRow from "./TableRow";
import styles from "./DeviceTable.module.css";
import {useState} from "react";

export default function DeviceTable(props) {
    const propTableData = props.tableData;
    const [searchStr, setSearchStr] = useState('');
    const [filteredData, setFilteredData] = useState([...propTableData]);

    function filterData() {
        setFilteredData(propTableData.filter(o =>
            Object.keys(o).some(k => o[k].toString().toLowerCase().includes(searchStr.toLowerCase()))));
    }

    function handleFilterOnChange(event, setFunction) {
        setFunction(event.target.value);
    }

    return (
        <div>
            <input type="text"
                   value={searchStr}
                   className={styles.filterInput}
                   onBlur={filterData}
                   onChange={(event) => handleFilterOnChange(event, setSearchStr)}
                   placeholder="Start typing to filter..."
                   title="Filter"/>
            <table className={styles.table}>
                <tbody>
                <tr>
                    <th></th>
                    <th>Device ID</th>
                    <th>Asset Tag</th>
                    <th>Currently Assigned To</th>
                    <th>Description</th>
                    <th>Key</th>
                </tr>
                    {filteredData.map(data => {
                        return (
                        <TableRow key={data.deviceId} rowData={data}/>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}