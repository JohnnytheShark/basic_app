import React from 'react';

import styles from './Paginator.module.scss';

const paginator = props =>(
    <div className={styles.paginator}>
        {props.children}
        <div className={styles.paginatorControls}>
            {props.currentPage > 1 && (
                <button className={styles.paginatorControl} onClick={props.onPrevious}>
                    Previous
                </button>
            )}
            {props.currentPage < props.lastPage && (
                <button className={styles.paginatorControl} onClick={props.onNext}>
                    Next
                </button>
            )}
        </div>
    </div>
);
export default paginator;