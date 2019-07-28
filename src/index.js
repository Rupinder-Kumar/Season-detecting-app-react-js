import React from "react";
import ReactDOM from 'react-dom';
import SeasonDisplay from "./SeasonDisplay/SeasonDisplay";
import Spinner from "./Spinner/Spinner";


export class App extends React.Component {    
  
    state = { lat: null, errorMessage: '' };

    componentDidMount() {        
        window.navigator.geolocation.getCurrentPosition(
            // updating state for lat
            position => this.setState({ lat: position.coords.latitude }),            
            // updating state for errorMessage
            err => this.setState({ errorMessage: err.message })            
        ); 
    }

    //Helper function for Conditional Rendering
    renderContent() {
         
         if(this.state.errorMessage && this.state.lat) {
            return (
                <div>
                    Error: {this.state.errorMessage}
                </div>
            )
        }

        if(!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat}/>
        }
       
        return <Spinner message="Please Accept Location Request"/>;
    }

    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );    
    }
}

ReactDOM.render(
    <App/>,document.querySelector("#root")
);