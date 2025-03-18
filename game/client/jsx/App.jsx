import React from 'react';
import Board from "./Board";

import {gameService} from "./services/GameService";
import Logs from "./Logs";
import Video from "./Video";
import Players from './Players';
import SelectPlayerDialog from "./SelectPlayerDialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {rtcService} from "./services/webrtc";
import Settings from "./Settings";
import HelpDialog from "./HelpDialog";

const MAX_LOGS = 200;
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
            chat: [],
            cardToShow: null,
            showHelp: true,
            lostConnection: false,
            showMoneyText: true // New state for showing/hiding money text
        };
    }

    toggleMoneyText = (showMoneyText) => {
        this.setState({ showMoneyText });
    }

    render() {
        if (this.state.game) {
            const showPlayerDialog = gameService.currentPlayer === null && !this.state.showHelp;
            const card = this.state.cardToShow;
            return (
                <div>
                    <Settings
                        game={this.state.game}
                        logs={this.state.logs}
                        chat={this.state.chat}
                        showHelp={this.showHelp}
                        toggleMoneyText={this.toggleMoneyText}  // Pass the toggle function
                    />
                    <div className="game">
                        <Board
                            game={this.state.game}
                            showMoneyText={this.state.showMoneyText} // Pass state to Board
                        />
                        <Logs logs={this.state.logs}/>
                        <Video game={this.state.game} chat={this.state.chat}/>
                        <Players game={this.state.game}/>
                    </div>
                    {this.state.showHelp && <HelpDialog dismiss={this.hideHelp}/>}
                    {showPlayerDialog && <SelectPlayerDialog game={this.state.game}/>}
                    {card && <div className="card-overlay">
                        <div className={"card-picked " + card.type}>
                            {<a className="close" onClick={(e) => {
                                this.setState({cardToShow: null});
                            }}>
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </a>}
                            <span className="card-type">{card.type}</span>
                            <span className="card-text">{card.card}</span>
                            <span className="card-player">TO: {card.player.name}</span>
                        </div>
                    </div>}
                </div>
            );
        } else {
            return (
                <div className="game-loading">
                    {this.state.lostConnection && <span>Lost connection to server, reconnecting...</span>}
                    {!this.state.lostConnection && <span>Loading game...</span>}
                </div>
            );
        }
    }
}