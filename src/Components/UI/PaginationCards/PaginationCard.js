import React, {useEffect,useState} from 'react';
import styles from './Pagination.module.scss';
import TableMapper from '../TableMapper/TableMapper';
import Table from '../Table/Table';

const PaginationCard = (props)=>{
    const [data,updateData] = useState([]);
    const [selectedData,updateSelectedData] = useState({});
    const [index,updateindex] = useState(0);
    const [count,updateCount] = useState("");

    useEffect(()=>{
        if (props.data !== undefined && props.data !== null){
            updateData(props.data);
            updateCount(props.data.length !== 1 ? props.data.length-1 : 1);
            updateSelectedData(props.data[0]);
        }
    },[props.data])

    const decreasePage=()=>{
        updateindex((prevState)=>{
            if (prevState !== 0){
                updateSelectedData(data[prevState-1]);
                return prevState - 1
            }
            else return prevState
        });
    };

    const increasePage=()=>{
        updateindex((prevState)=>{
            if (prevState < count && count != 1){
                updateSelectedData(data[prevState+1]);
                return prevState + 1;
            }
            else return prevState;
        });
    };

    const beginningPage=()=>{
        updateindex(0);
        updateSelectedData(data[0]);
    };
    const lastPage=()=>{
        updateindex(count);
        updateSelectedData(data[count]);
    };

    let paginationControls = count > 1 ? (<div className={styles.paginationControls}>
        <button onClick={()=>beginningPage()}>&laquo;&laquo;</button>
        <button onClick={()=>decreasePage()}>&laquo;</button>
        <p>Profile: {index+1}</p>
        <button onClick={()=>increasePage()}>&raquo;</button>
        <button onClick={()=>lastPage()}>&raquo;&raquo;</button>
        </div>) : "";
    
    let tableDisplay = count >= 1 ? <Table><TableMapper key={1} headers={Object.keys(selectedData['x'])} data={Object.values(selectedData['x'])}/></Table> : "";

    return <div className={styles.paginationCard}>
        {tableDisplay}
        {props.children}
        {paginationControls}
        </div>
}

export default PaginationCard;
