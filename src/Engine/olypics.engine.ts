import * as Result from './Models/result';
import { nounList, adjectiveList } from '../Mock/names';



export class OlympicsEngine {
    state: IOlympicsState;


    minimumPlayersPerTeam: number = 1;
    teamNames: string[];

    constructor() {
        let nouns = this.shuffle(nounList());
        let adjectives = this.shuffle(adjectiveList());
        if (adjectives.length > nouns.length) {
            this.teamNames = nouns.map((noun, index) => `${adjectives[index]} ${noun}`);
        } else {

            this.teamNames = adjectives.map((adjective, index) => `${adjective} ${nouns[index]}`);
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

    buildBrackets() {
        Object.keys(this.state.games).forEach(game => {
            const bracket = this.buildBracketStructure();

            //Fill the first round with random team assignments.
            var teams = this.shuffle(Object.keys(this.state.teams));

            var round1 = bracket.filter(b => b.currentMatch.round == "1");
            teams.forEach((team, index) => {
                let match = round1[index % round1.length]
                if (!match.team1) {
                    match.team1 = team;
                } else if (!match.team2) {
                    match.team2 = team;
                }
            });

            round1.forEach(round => {
                if (round.team1) {
                    //add round to team1 schedule

                    if(!this.state.teams[round.team1].schedule){
                        this.state.teams[round.team1].schedule={};
                    }
                    this.state.teams[round.team1].schedule[game] = { match: round.currentMatch};
                }
                if (round.team2) {
                    //add round to team2 schedule
                    if(!this.state.teams[round.team2].schedule){
                        this.state.teams[round.team2].schedule={};
                    }
                    this.state.teams[round.team2].schedule[game] =  { match: round.currentMatch};
                }
            })
            this.state.games[game].bracket = bracket;
        })
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

    get numberOfTeams() {
        return Math.floor(Object.keys(this.state.players).length / this.minimumPlayersPerTeam);
    }

    get rounds() {
        return Math.floor(Math.log2(this.numberOfTeams));
    }

    private buildBracketStructure(): IMatchNode[] {
        //games first round
        //let firstRoundGames= Math.pow(2,this.rounds);
        let matches: IMatchNode[] = [
            {
                currentMatch: {
                    round: `${this.rounds}`,
                    match: `1`
                },
                nextMatch: null,
                team1: null,
                team2: null
            }
        ];
        for (let i = 1; i < this.rounds; i++) {
            let gamesThisRound = Math.pow(2, i + 1);

            for (let j = 0; j < gamesThisRound; j++) {
                matches.push({
                    currentMatch: {
                        round: `${this.rounds - i}`,
                        match: `${j + 1}`
                    },
                    nextMatch: gamesThisRound > 1 ? {
                        round: `${this.rounds - i + 1}`,
                        match: `${(j - j % 2) / 2 + 1}`
                    } : null,
                    team1: null,
                    team2: null
                });
            }

        }

        /* for(let i=0;i<firstRoundGames; i++){
            games.push({
                game:`${i+1}`,
                nextGame:`2-${(i-i%2)/2+1}` 
            });
        } */

        //let uncontestedFirstRoundMatches= (firstRoundGames*2) % this.numberOfTeams

        return matches;
        //Build a pyramid
        /* let structure=[];
        for(let i=0; i<this.rounds; i++){
            let round=[];
            for(let j=Math.pow(2, i); j>0; j--){
                round.push({
                    round: this.rounds-i,
                    game: j,
                    team1: null,
                    team2: null
                });
            }
            structure.push(round);
        }
        return structure; */
    }

    randomizeTeams() {
        if (Object.keys(this.state.players).length < 2) {
            throw Error('Must have at least 2 players')
        }
        if (Object.keys(this.state.games).length < 1) {
            throw Error('Must have at least 1 game')
        }

        let players = this.shuffle(Object.keys(this.state.players));

        while (players.length > 0) {
            const teamIndex = players.length % this.numberOfTeams;
            if (!this.state.teams[teamIndex]) {
                this.state.teams[teamIndex] = {
                    id: teamIndex,
                    name: this.teamNames[teamIndex],
                    players: []
                };
            }
            this.state.teams[teamIndex].players.push(players.pop());
        }
    }

    toJsonString(): string {
        return JSON.stringify(this.state, null, 4);
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
    schedule?: any;
    id: number;
    name: string;

    players: string[];
}
export interface IGame {
    bracket?: IMatchNode[];
    id: string;
    name: string;

    minimumPlayersPerTeam: number;
}

export interface IMatch {
    round: string;
    match: string;
}

export interface IMatchNode {
    team1: any;
    team2: any;
    currentMatch: IMatch;
    nextMatch: IMatch | null;
}