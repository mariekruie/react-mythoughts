import React, { Component } from 'react';

import './post-list-item.css';

class PostListItem extends Component {

    render() {

        const { label, important, like, onDelete, onToggleImportant, onToggleLiked } = this.props;

        let classNames = 'app-list-item d-flex justify-content-between';

        if (important) {
            classNames += ' important';
        }

        if (like) {
            classNames += ' like';
        }

        return (
            <div className={classNames}>
                <span className="app-list-item-label">
                    {label}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button" className="btn-star btn-sm" onClick={onToggleLiked}>
                        <i className="fa fa-heart"></i>
                    </button>
                    <button type="button" className="btn-star btn-sm" onClick={onToggleImportant}>
                        <i className="fa fa-star"></i>
                    </button>
                    <button type="button" className="btn-trash btn-sm" onClick={onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}


export default PostListItem;