import React from "react";
import "../Buttons.scss";
import $ from "jquery";

let darkBackground = "linear-gradient(to bottom, #232526, #000000)",
  darkFontColor = "#e6e6e6",
  darkContent = "linear-gradient(to bottom, #2d2d2d 0%, #010101 99%)",
  darkMark = "#ffee51",
  darkSelected = "#ab5e00",
  whiteBackground = "linear-gradient(to bottom, #ddd4d4, #ffffff)",
  whiteContent = "linear-gradient(to top, #f3f3f3 0%, #ffffff 30%)",
  whiteFontColor = "#2d2d2d",
  whiteMark = "#ffee51",
  whiteSelected = "rgb(255, 176, 176)",
  theme = "white";

class Theme extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: "white"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    if (document.getElementById("theme-checkbox").checked) {
      theme = "dark";
    } else {
      theme = "white";
    }
    this.setState({ theme });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      let layer = (this.props.mode === 'edit') ? 'textarea' : '.highlights'
      console.log(layer)
      switch (this.state.theme) {
        case "white":
            $(".App").css({
              background: whiteBackground
            });
            $(".backdrop").css({
              background: whiteContent
            });
            $(".checker__paragraph").css({
              background: whiteContent
            });
            $("#check-textarea").css({
              background: whiteContent
            });
            $(layer).css({
              color: whiteFontColor
            });
            this.props.switchTheme('white')
            break
        case "dark":
            $(".App").css({
              background: darkBackground
            });
            $(".backdrop").css({
              color: darkFontColor,
              background: darkContent
            });
            $(".checker__paragraph").css({
              background: darkContent
            });
            $("#check-textarea").css({
              background: darkContent
            });
            $(layer).css({
              color: darkFontColor
            });
            this.props.switchTheme('dark')
            break
        default:
          return
      }
       
      if (this.state.theme === "white") {
       
      } else {
        
      }
    }
  }
  render() {
    return (
      <div className="switch">
        
        <label className="form-switch">
        
          <input
            id="theme-checkbox"
            theme={this.state.theme}
            onClick={this.handleChange}
            type="checkbox"
          ></input>
          
          <i></i>
        </label>
        <h2>theme</h2>
        
      </div>
    );
  }
}

export default Theme;
