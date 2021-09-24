import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import styled from 'styled-components';
import './app.css';

import ls from 'local-storage';

const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;  // создаем стилизованный блок

const AppBlockCopy = styled(AppBlock)`
    background-color: grey;
`; // копируем стили у AppBlock и добавляем новые

export default class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            data : [],
            query: '',
            filter: 'all'
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.searchPosts = this.searchPosts.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.filterPosts = this.filterPosts.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 1;
    }

    deleteItem(id){
        this.setState( ({data}) => {
            return(
                this.state = {
                    data: data.filter( el => el.id !== id)
                }
            )
        })
    }

    addItem(text){
        const newItem = {
            label: text,
            important: false,
            like: false,
            id: this.maxId++,
        }

        this.setState(({data}) => {
            return(
                this.state = {
                    data: [...data, newItem],
                }
            );
        })
    }

    onToggleImportant (id) {
        this.setState( ({data}) => {
            const index = data.findIndex( elem => elem.id === id);
            const oldElem = data[index];
            const newElem = {...oldElem, important: !oldElem.important};
            const newArr = [...data.slice(0,index), newElem, ...data.slice(index+1)];

            return(
                this.state = {
                    data: newArr
                }
            )
        })
    }

    onToggleLiked (id) {
        this.setState( ({data}) => {
            const index = data.findIndex( elem => elem.id === id);
            const oldElem = data[index];
            const newElem = {...oldElem, like: !oldElem.like};
            const newArr = [...data.slice(0,index), newElem, ...data.slice(index+1)];

            return(
                this.state = {
                    data: newArr
                }
            )
        })
    }

    searchPosts(items, query){
        if(query.length===0){
            return items;
        }
        return items.filter( item => {
            return item.label.indexOf(query) > -1;
        })
    }

    onUpdateSearch(query){
        this.setState({query});
    }

    filterPosts(items, filter){
        if(filter === 'like'){
            return items.filter( item => item.like)
        } else {
            return items;
        }
    }

    onFilterSelect(filter){
        this.setState({filter});
    }

    render(){
        const {data, query, filter} = this.state;
        const likedItems = data.filter( item => item.like).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPosts(this.searchPosts(data, query), filter);

        return (
            <AppBlock>
                 <AppHeader likedItems={likedItems} allPosts={allPosts}/>
                 <div className="search-panel d-flex">
                     <SearchPanel onUpdateSearch = {this.onUpdateSearch}/>
                     <PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                 </div>
                 <PostAddForm addItem={this.addItem}/>
                 <PostList posts={visiblePosts}
                  onDelete={this.deleteItem}
                  onToggleImportant={this.onToggleImportant}
                  onToggleLiked={this.onToggleLiked}
                  />
            </AppBlock>
         )
    }
}

