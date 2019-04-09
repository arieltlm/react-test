import React, {Component} from 'react';


export default class Comment extends Component {
   
    constructor(props) {
        super(props);
    }

    render() {
        const {username, content}  = this.props;
        return (
            <div className="comment">
               <div className="comment-user">
                    <span>{username}：</span>
               </div> 
               <p>{content}</p> 
            </div>
        )
    }
}