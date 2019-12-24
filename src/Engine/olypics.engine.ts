import * as Result from './Models/result';
import {nounList, adjectiveList } from '../Mock/names';



export class OlympicsEngine {
    state: IOlympicsState;

    
    minimumPlayersPerTeam: number = 1;
    teamNames: string[];

    constructor() {
        let nouns=this.shuffle(nounList());
        let adjectives=this.shuffle(adjectiveList());
        if(adjectives.length>nouns.length){
            this.teamNames=nouns.map((noun,index)=>`${adjectives[index]} ${noun}`);
        } else {

            this.teamNames=adjectives.map((adjective,index)=>`${adjective} ${nouns[index]}`);
        }
        this.state = {
            teams: {},
            players: {},
            games: {},
        };
    }


    addPlayer(player: IPlayer) {
        this.state = {
            ...this.state,
            players: {
                ...this.state.players,
                [player.id]: player
            }
        };
    }
    addGame(game: IGame) {
        this.minimumPlayersPerTeam = Math.max(this.minimumPlayersPerTeam, game.minimumPlayersPerTeam);
        this.state = {
            ...this.state,
            games: {
                ...this.state.games,
                [game.id]: game
            }
        };
    }

    private shuffle(items: any[]): any[] {
        var currentIndex = items.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = items[currentIndex];
            items[currentIndex] = items[randomIndex];
            items[randomIndex] = temporaryValue;
        }

        return items;
    }

    randomizeTeams() {
        if(Object.keys(this.state.players).length<2) 
        {
            throw Error('Must have at least 2 players')
        }
        if(Object.keys(this.state.games).length<1   ) 
        {
            throw Error('Must have at least 1 game')
        }
        
        let players = this.shuffle(Object.keys(this.state.players));

        var numberOfTeams = Math.floor(players.length / this.minimumPlayersPerTeam);

        while (players.length > 0) {
            const teamIndex=players.length % numberOfTeams;
            if (!this.state.teams[teamIndex]) {
                this.state.teams[teamIndex] = {
                    id:teamIndex,
                    name:this.teamNames[teamIndex],
                    players:[]
                };
            }
            this.state.teams[teamIndex].players.push(players.pop());
        }
    }
    
    toJsonString(): string{
        return JSON.stringify(this.state,null,4);
    }
}

export interface IOlympicsState {
    players: { [id: string]: IPlayer },
    teams: { [id: number]: ITeam }
    games: { [id: string]: IGame }
}

export interface IPlayer {
    id: string;
    name: string;

}
export interface ITeam {
    id: number;
    name: string;

    players: string[];
}
export interface IGame {
    id: string;
    name: string;

    minimumPlayersPerTeam: number;
}