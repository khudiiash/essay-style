import React from "react";
import "../Buttons.scss";
import $ from "jquery";



class Style extends React.Component {
  constructor() {
    super();
    this.state = {
      style: 'APA'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    let style;
    if (document.getElementById("style-checkbox").checked) {
      style = "MLA";
      this.props.toMLA()
    } else {
      style = "APA";
      this.props.toAPA()
    }
    this.setState({style})
  }

  render() {
    return (
      <div className="switch">
        
        <label className="form-switch">
        
          <input
            id="style-checkbox"
            style={this.state.citationStyle}
            onClick={this.handleChange}
            type="checkbox"
          ></input>
          
          <i></i>
        </label>
        <h2>{this.props.citationStyle}</h2>
        
      </div>
    );
  }
}

export default Style;
