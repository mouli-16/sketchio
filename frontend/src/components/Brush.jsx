
// import  "../styles/draw.css";

export default function Brush() {
    return (
        <div className="brushContainer">
        <div className="color-picker-container">
                    Select Brush Color: &nbsp;
                    <input type="color"  value={this.state.color} onChange={this.changeColor.bind(this)}/>
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
                </div> </div>
    )
}
