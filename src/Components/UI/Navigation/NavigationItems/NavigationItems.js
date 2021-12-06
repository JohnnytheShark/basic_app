import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'

const navItem = [
    {id: 'Home', text: 'Home', link: '/' },
    {id: 'About', text: 'About', link: '/About'}
]

class navigationItems extends Component{
    render(){
        let items = [];
        items = [...navItem.map(item=>(<li key={item.id}><NavLink to={item.link} exact>{item.text}</NavLink></li>))]
        return(
            items
        )
    }
}

export default navigationItems;