  
import React from 'react';
import PostListItem from '../post-list-item';
import { ListGroup } from 'reactstrap';
import './post-list.css';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

    const rows = posts.map(post => {

        const {id, ...otherProps} = post;

        return(
            <li key = {id} className="list-group-item">
                <PostListItem {...otherProps}
                onDelete={() => onDelete(id)}
                onToggleImportant={() => onToggleImportant(id)}
                onToggleLiked={() => onToggleLiked(id)}/>
            </li>
        )
    })

    return (
        <ListGroup className="app-list">
            {rows}
        </ListGroup>
    )
}

export default PostList;