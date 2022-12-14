import React from 'react';
import styles from  './Table.module.scss';
/**
 * Table Component that adds base styles to display easier
 * @param {*} props Typically the headers and information go here
 * @returns 
 */
const Table = props =><div role="region" aria-labelledby={props.arialabel} tabIndex="0" className={`${styles.TableContainer} ${props.className}`}><table className={`${styles.table} ${props.className}`}><caption>{props.caption}</caption>{props.children}</table></div>

export default Table;
