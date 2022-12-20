import React, {useState,useEffect} from 'react';
import styles from '../Table.module.scss';

/**
 * Component that maps data to either headers or table based on the data coming in
 * @param {*} Props containing either Type, Data, Key, Function to Rows, and row styles
 * @returns Table Headers or Table Rows depending on what is given to it. 
 */
const TableRows = ({Type,Data,Key,passDownFunction})=>{
    const [loading,toggleLoading] = useState(true);
    const [data,updateData] = useState("");
    const [newArray, updateNewArray] = useState([]);
    const [type, updateType] = useState("");
    const [key, updateKey] = useState("");
    const [active,updateSelection] = useState({});

    useEffect(()=>{
        updateKey(Key);
        updateData(Data);
        updateType(Type);
        toggleLoading(false);
        if (Type === 'Body'){
            updateSelection(rowEnumerator(Data));
        }
    },[]);

    const updateRowStyle=(i)=>{
        let value = !active[i];
        console.log(`${i},${value}`);
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
        if (Data.length > 1 && Key == null && Type === 'Body'){
            let items = [];
            for (let i = 0; i< Data.length; i++){
                let values = Object.values(Data[i]);
                let mapped = values.map((element,index)=><td key={index} onClick={e=>passDownFunction ? passDownFunction : void(0)}>{element||0}</td>)
                items.push(<tr className={active[i] == true ? `${styles.active}` : ""} onClick={()=>updateRowStyle(i)} key={i}>{mapped}</tr>);
            }
            updateNewArray(items);
        }
        else if (Data.length == 1 && Key == null && Type === 'Body'){
            let values = Object.values(Data[0]);
            let mapped = values.map((element,index)=><td key={index}>{element||0}</td>)
            updateNewArray(<tr onClick={e=>passDownFunction ? passDownFunction : void(0)}>{mapped}</tr>);
        }
        else if (Data.length > 1 && Key != null && Type === 'Body'){
            let items = []
            for (let i = 0; i < Data.length;i++ ){
                let values = Object.values(Data[i][Key]);
                let mapped = values.map((element,index)=><td key={index}>{element}</td>)
                items.push(<tr onClick={e=>passDownFunction ? passDownFunction : void(0)}>{mapped}</tr>)
            }
            updateNewArray(items);
        }
        else if (Data.length == 1 && Key != null && Type === 'Body'){
            let values = Object.values(Data[0][Key]);
            let mapped = values.map((element,index)=><td key={index}>{element}</td>)
            updateNewArray(<tr onClick={e=>passDownFunction ? passDownFunction : void(0)}>{mapped}</tr>);
        }
    },[active]);

    let headers = Object.keys(data).length >= 1 && type === "Header" ? Object.keys(data).map((element,index)=><th key={index}>{element.replace(/[A-Z]/g, ' $&').trim().toUpperCase()}</th>):"";
    let body = key == "" && data.length == 1 ? Object.values(data[0]).map((element,index)=><td key={index}>{element||0}</td>) : data.length > 1 ? [newArray] : "";
    let tableInformation = type === "Header" ? <thead><tr>{headers}</tr></thead> : type === "Body" ?  <tbody>{body}</tbody> : <tbody><tr>No Data Found</tr></tbody>;
    
    let context = loading ?  "" : tableInformation ;

    return context
}
export default TableRows;

