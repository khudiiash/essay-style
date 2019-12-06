import React from 'react';
import './Table.scss'
import $ from 'jquery'


class Table extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                mistake1: undefined,
                mistake2: undefined,
                mistake3: undefined,
                mistake4: undefined,
                mistake5: undefined,
                mistake6: undefined,
                mistake7: undefined
            }

        }
   componentDidUpdate(prevProps){
            if(this.props !==prevProps) {

                setTimeout(function(){
                    $('#allMistakes').each(function () {
                        $(this).prop('Counter',0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 3000,
                            easing: 'swing',
                            step: function (now) {
                                $(this).text(Math.ceil(now));
                            }
                        });
                      });
                      $('.counter').each(function () {
                        $(this).prop('Counter',0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 3000,
                            easing: 'swing',
                            step: function (now) {
                                $(this).text(Math.ceil(now)+'%');
                                
                            }
                        });
                      });
                },50)
               
                $('.table').css({bottom: '1%'})
                let number  = this.props.number,
                    style = {'Style':Math.round(this.props.style/number*100)},
                    formatting = {'Formatting':Math.round(this.props.formatting/number*100)},
                    grammar = {'Grammar':Math.round(this.props.grammar/number*100)},
                    structure = {'Structure':Math.round(this.props.structure/number*100)},
                    
                    mistakes = [style,formatting,grammar,structure].sort(function(a, b) {
                        return Object.values(a)[0] - Object.values(b)[0]}).reverse()
                    
                this.setState({
                    mistake1: mistakes[0],
                    mistake2: mistakes[1],
                    mistake3: mistakes[2],
                    mistake4: mistakes[3],
                    mistake5: mistakes[4],
                })

            }
          

            
            
    }
    render() {
        
        
        return (
            this.state.mistake1 ?
            <div className='table' id='mainTable'>
                <div className='table__body'>
                   <div className='table__body__row'>
                    <div className='table__body__row__num heading'>Mistakes</div><div className='table__body__row__num heading' id='allMistakes'>{this.props.number}</div>
                    </div>
                    <div className='table__body__row'>
                    <div className='table__body__row__num'>{Object.keys(this.state.mistake1)[0]}</div><div className='table__body__row__num counter'>{Object.values(this.state.mistake1)[0]}%</div>
                    </div>
                    <div className='table__body__row'>
                    <div className='table__body__row__num'>{Object.keys(this.state.mistake2)[0]}</div><div className='table__body__row__num counter'>{Object.values(this.state.mistake2)[0]}%</div>
                    </div>
                    <div className='table__body__row'>
                    <div className='table__body__row__num'>{Object.keys(this.state.mistake3)[0]}</div><div className='table__body__row__num counter'>{Object.values(this.state.mistake3)[0]}%</div>
                    </div>
                    <div className='table__body__row'>
                    <div className='table__body__row__num'>{Object.keys(this.state.mistake4)[0]}</div><div className='table__body__row__num counter'>{Object.values(this.state.mistake4)[0]}%</div>
                    </div>
                </div>
            </div> : <div className='table'></div>
            )} 
    }

export default Table;