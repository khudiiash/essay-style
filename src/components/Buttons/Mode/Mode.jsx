import React from "react";
import "../Buttons.scss";
import $ from "jquery";



class Mode extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: "edit"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    let mode;
    if (document.getElementById("mode-checkbox").checked) {
      mode = "check";
    } else {
      mode = "edit";
    }
    this.setState({ mode: mode });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mode !== this.state.mode) {
      if (this.state.mode === "check") {
        $('textarea').css({zIndex: '0'})
        $('.backdrop').css({zIndex: '1'})
        $('.highlights').css({color: "#2d2d2d"})
        $('span').unbind('mouseenter').unbind('mouseleave')
        $('span').css({background:'#ffff00',color: "#2d2d2d"})
        this.props.toChecker()
      } else {
        $('textarea').css({zIndex: 'auto'})
        $('.backdrop').css({zIndex: 'auto'})
        $('.highlights').css({color: "transparent"})
        this.props.toEditor()
        
      }
    }
  }
  render() {
    return (
      <div className="switch">
        
        <label className="form-switch">
        
          <input
            id="mode-checkbox"
            mode={this.state.mode}
            onClick={this.handleChange}
            type="checkbox"
          ></input>
          
          <i></i>
        </label>
        <h2>{this.state.mode}</h2>
        
      </div>
    );
  }
}

export default Mode;
