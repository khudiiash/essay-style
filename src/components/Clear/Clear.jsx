import React from 'react';
import "./Clear.scss";
import $ from "jquery";

class Clear extends React.Component {
    
    constructor() {
        super()
        this.clearParagraph = () => {
            $(".editor__paragraph").text('');
            $("#text-area").val('');
            $("#text-area").css({ zIndex: "3" , opacity: "1"});
            $("#mistake").css({ opacity: "0"});
            $('.table').css('opacity','0')
            
           
        }
    }
    render() {
        return (
            <div className='clear__container'>
                <img src="https://www.freeiconspng.com/uploads/clear-icon-3.png" onClick={() => { this.clearParagraph() }} className='clear__icon' id='clear-button' alt="Clear Icon"/>
                <h2 className='clear__hidden-label'>clear</h2>
            </div>
        );
    }
    
};



export default Clear;