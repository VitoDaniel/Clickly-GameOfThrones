import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import Card from "./components/Card";
import Footer from "./components/Footer";
import GOT from "./got.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    GOT,
    clickedGOT: [],
    score: 0
  };

//when you click on a card ... the fish is taken out of the array
  imageClick = event => {
    const currentGOT = event.target.alt;
    const GOTAlreadyClicked =
      this.state.clickedGOT.indexOf(currentGOT) > -1;

//if you click on a fish that has already been selected, the game is reset and cards reordered
    if (GOTAlreadyClicked) {
      this.setState({
        GOT: this.state.GOT.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedGOT: [],
        score: 0
      });
        alert("You lose. Click OK to play again.");

//if you click on an available fish, your score is increased and cards reordered
    } else {
      this.setState(
        {
          GOT: this.state.GOT.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedGOT: this.state.clickedGOT.concat(
            currentGOT
          ),
          score: this.state.score + 1
        },
//if you get all 12 fish corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("You Win!");
            this.setState({
              GOT: this.state.GOT.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedGOT: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.GOT.map(GOT => (
            <Card
              imageClick={this.imageClick}
              id={GOT.id}
              key={GOT.id}
              image={GOT.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;