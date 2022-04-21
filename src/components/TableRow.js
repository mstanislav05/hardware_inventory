import {Link} from "react-router-dom";

export default function TableRow(props) {
    return (

        <tr>
            <td id='edit'>
                <Link
                to={{
                    pathname: `./view/${props.rowData.deviceId}`,
                    state: { rowData: props.rowData }
                }}>Edit
                </Link>
            </td>
            <td id='deviceId'>{props.rowData.deviceId}</td>
            <td id='assetTag'>{props.rowData.assetTag}</td>
            <td id='currentlyAssignedTo'>{props.rowData.currentlyAssignedTo}</td>
            <td id='description'>{props.rowData.description}</td>
        </tr>

    )
}