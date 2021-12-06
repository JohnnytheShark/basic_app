import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NavigationItems from './NavigationItems/NavigationItems';
import MobileNavigation from './MobileNavigation';
import WebsiteLogo from '../../Logo/Logo';
import styles from './Navigation.module.scss';
import BurgerIcon from '../../../assets/icons/Burger_Icon_White.svg';
import FriesIcon from '../../../assets/icons/Fries_White_Icon.svg';

class Navigation extends Component{
    constructor(props){
        super(props);
        this.state={
            toggle: true,
            view: 'none'
        }
        this.mobileNavigationHandler = this.mobileNavigationHandler.bind(this);
    }
    mobileNavigationHandler(){
        if (this.state.view === 'none'){
            this.setState(prevState=>({view: 'block',toggle: !prevState.toggle}));
        }
        else{
            this.setState(prevState=>({view:'none',toggle: !prevState.toggle}));
        }
    }
    
    render(){
        let iconType = null;
        if (this.state.toggle){
            iconType = BurgerIcon;
        }else{
            iconType = FriesIcon;
        }
        return(
            <div>
                <nav>
                    <div className={styles.BurgerIcon} onClick={this.mobileNavigationHandler}><img src={iconType} alt='icon'/></div>
                    <NavLink to="/"><WebsiteLogo /></NavLink>
                    <ul className={styles.normallist}><NavigationItems/></ul>
                </nav>
                <MobileNavigation style={this.state.view}/>
            </div>
        )
    }
}

export default Navigation;