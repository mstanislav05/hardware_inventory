import {useLocation} from "react-router-dom";
import styles from './DeviceDetails.module.css';
import {useRef} from "react";
import {useDispatch} from "react-redux";

export default function DeviceDetails(props) {
    const dispatch = useDispatch();

    let currentRowData = null;
    const stateRowData = useLocation().state;
    if (stateRowData !== undefined) {
        currentRowData = stateRowData.rowData;
    };

    const idInputRef = useRef();
    const assetTagInputRef = useRef();
    const currentlyAssignedToInputRef = useRef();
    const descriptionInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const updatedObj = {
            deviceId: idInputRef.current.value,
            assetTag: assetTagInputRef.current.value,
            currentlyAssignedTo: currentlyAssignedToInputRef.current.value,
            description: descriptionInputRef.current.value
        }

        if(props.createMode) {
            dispatch({type: 'add', deviceData: updatedObj})
        } else {
            dispatch({type: 'update', deviceData: updatedObj})
        }
    }
    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.control}>
                <label htmlFor="id">Device</label>
                <input type="text" required readOnly={props.createMode? false: true} id='id' defaultValue={currentRowData?.deviceId} ref={idInputRef}/>
            </div>
            <div className={styles.control}>
                <label htmlFor="assetTag">Asset Tag</label>
                <input type="text" required id='assetTag' defaultValue={currentRowData?.assetTag} ref={assetTagInputRef}/>
            </div>
            <div className={styles.control}>
                <label htmlFor="currentlyAssignedTo">Currently Assigned To</label>
                <input type="text" required id='currentlyAssignedTo' defaultValue={currentRowData?.currentlyAssignedTo} ref={currentlyAssignedToInputRef}/>
            </div>
            <div className={styles.control}>
                <label htmlFor="description">Description</label>
                <textarea required id='description' rows='5' defaultValue={currentRowData?.description} ref={descriptionInputRef}/>
            </div>

            <div className={styles.actions}>
                <button>Save</button>
            </div>
        </form>

    )
}