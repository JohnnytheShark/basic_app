import React, {useState,useEffect} from 'react';
import styles from '../Table.module.scss';

/**
 * Component that maps data to either headers or table based on the data coming in
 * @param {*} Props containing either Type, Data, Key, Function to Rows, and row styles
 * @returns Table Headers or Table Rows depending on what is given to it. 
 */
const TableRows = (props)=>{
    const [loading,toggleLoading] = useState(true);
    const [data,updateData] = useState("");
    const [newArray, updateNewArray] = useState([]);
    const [type, updateType] = useState("");
    const [key, updateKey] = useState("");
    const [active,updateSelection] = useState({});

    useEffect(()=>{
        updateKey(props.Key);
        updateData(props.Data);
        updateType(props.Type);
        toggleLoading(false);
        if (props.Type === 'Body'){
            updateSelection(rowEnumerator(props.Data));
        }
    },[props.Data]);

    const updateRowStyle=(i)=>{
        let value = !active[i];
        updateSelection({...active,[i]:value});
    }
    const rowEnumerator= (dataSet) =>{
        let items = {}
        for (let i = 0; i < dataSet.length; i++){
            items[i] = false;
        }
        return items;
    }

    useEffect(()=>{
        if (props.Type === 'Body'){
            if (props.Data.length > 1 && props.Key == null){
                let items = [];
                for (let i = 0; i< props.Data.length; i++){
                    let values = Object.values(props.Data[i]);
                    let mapped = values.map((element,index)=><td key={index}>{element||0}</td>)
                    items.push(<tr className={active[i] == true ? `${styles.active}` : ""} onClick={()=>{updateRowStyle(i); props.passDownFunction(props.Data[i])}} key={i}>{mapped}</tr>);
                }
                updateNewArray(items);
            }
            else if (props.Data.length == 1 && props.Key == null){
                let values = Object.values(props.Data[0]);
                let mapped = values.map((element,index)=><td key={index}>{element||0}</td>)
                updateNewArray(<tr onClick={()=>{props.passDownFunction(props.Data[0])}}>{mapped}</tr>);
            }
            else if (props.Data.length > 1 && props.Key != null){
                let items = []
                for (let i = 0; i < props.Data.length;i++ ){
                    let values = Object.values(props.Data[i][props.Key]);
                    let mapped = values.map((element,index)=><td key={index}>{element}</td>)
                    items.push(<tr onClick={()=>{updateRowStyle(i); props.passDownFunction(props.Data[i])}}>{mapped}</tr>)
                }
                updateNewArray(items);
            }
            else if (props.Data.length == 1 && props.Key != null){
                let values = Object.values(props.Data[0][props.Key]);
                let mapped = values.map((element,index)=><td key={index}>{element}</td>)
                updateNewArray(<tr className={active[i] == true ? `${styles.active}`:""} onClick={()=>{props.passDownFunction(props.Data[0][props.Key])}}>{mapped}</tr>);
            }
        }
    },[active]);

    let headers = type === "Header" && typeof data == "object" ? Object.keys(data).map((element,index)=><th key={index}>{element.replace(/[A-Z]/g, ' $&').trim().toUpperCase()}</th>):"";
    let body = <tr><td>No Data Found</td></tr>;
    if (type === "Body"){
        body = key == "" && data.length == 1 ? Object.values(data[0]).map((element,index)=><td key={index}>{element||0}</td>) : data.length > 1 ? [newArray] : <tr><td>No Data Found</td></tr>;
    }
    let tableInformation = type === "Header" ? <thead><tr>{headers}</tr></thead> : type === "Body" ?  <tbody>{body}</tbody> : <tbody><tr><td>No Data Found</td></tr></tbody>;
    
    let context = loading ?  "" : tableInformation ;

    return context
}
export default TableRows;

