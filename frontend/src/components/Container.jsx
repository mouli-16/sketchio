import { Button } from '@mui/material';
import React from 'react';
import  "../styles/container.css";
import Board from './Board';

class Container extends React.Component{
    constructor(props){
        super(props);
        this.state={
            color:"#000000",
            size:"5"
        }

    }
        changeColor(params){
            this.setState({
                color: params.target.value
            })
    }
        changeSize(params){
            this.setState({
                size: params.target.value
            })

        }

     handleClear = ()=>{
         this.clearArea()
     } 
     clearArea = () =>{
        var canvas = document.querySelector('#Board');
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0,0,canvas.clientWidth,canvas.height);
     }  




    render(){
        return(
            <div className="container">
                <div className="board-container">
                    <Board color={this.state.color} size={this.state.size}></Board>
                </div>
                {/* <div className="tools"> */}
                <div className="brushContainer">
                
                <div className="color-picker-container">
                    Color: &nbsp;
                    <input type="color"  value={this.state.color} onChange={this.changeColor.bind(this)}/>
                </div>
                <div className="clear">
                    <button onClick={this.handleClear}>CLEAR</button>
                </div>
                
                <div className="brushsize-container">
                    Select Brush Size: &nbsp;
                    <select value={this.state.size} onChange={this.changeSize.bind(this)}>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                    </select>
                
                </div>
                </div>
                {/* </div> */}
            </div>
        )
    }
}



export default Container
