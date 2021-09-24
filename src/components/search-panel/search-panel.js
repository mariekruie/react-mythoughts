import React, { Component } from 'react';

import './search-panel.css'

export default class SearchPanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            query: ''
        }

        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    onUpdateSearch(event){

        const query = event.target.value;

        this.setState={query};

        this.props.onUpdateSearch(query);

    }
   
    render(){
        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записям"
                onChange={this.onUpdateSearch}
            />
        )
    }
}
