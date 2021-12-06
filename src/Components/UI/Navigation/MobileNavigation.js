import React, { Component } from 'react';
import NavigationItems from './NavigationItems/NavigationItems';
import styles from './Navigation.module.scss';

class MobileNavigation extends Component{
    
    render(){
        return(
            <div style={{display: this.props.style}}>
                <ul className={styles.mobileList}><NavigationItems/></ul>
            </div>
        )
    }
}

export default MobileNavigation;