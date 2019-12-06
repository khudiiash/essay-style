import React from 'react';
import './Comment.scss'


const Comment = (props) => {
    return (
            <div className='comment'>
                <div className='comment-heading'></div>
                
                <div className='comment-text'>{props.comment}</div>
                
                <div className='comment-replaces'>
                     <div className='comment-replace btn-0'></div>
                     <div className='comment-replace btn-1'></div>
                     <div className='comment-replace btn-2'></div>
                </div>
                
            </div>
    );
};

export default Comment;