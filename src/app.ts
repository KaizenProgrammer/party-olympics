import { customElement, html, LitElement, css } from "lit-element";
import { OlympicsEngine } from "./Engine/olypics.engine";
import { names } from "./Mock/names";

@customElement("party-olympics")
export class PartyOlympics extends LitElement {

    olympicsEngine: OlympicsEngine=new OlympicsEngine();
    constructor() {
        super();
        names().map((name,index)=>{
            this.olympicsEngine.addPlayer({
                id:index.toString(),
                name: name.trim()
            });
        });

        let minimumPlayersPerTeam=4;
        this.olympicsEngine.addGame({
            id:'ping-pong',
            name:'Ping Pong',
            minimumPlayersPerTeam:minimumPlayersPerTeam
        });
        this.olympicsEngine.addGame({
            id:'cornhole',
            name:'Cornhole',
            minimumPlayersPerTeam:minimumPlayersPerTeam
        });
        this.olympicsEngine.addGame({
            id:'mario-kart',
            name:'Mario Kart',
            minimumPlayersPerTeam:minimumPlayersPerTeam
        });
        
        this.olympicsEngine.addGame({
            id:'bowling',
            name:'Bowling',
            minimumPlayersPerTeam:minimumPlayersPerTeam
        });
        
        this.olympicsEngine.addGame({
            id:'cornhole',
            name:'Cornhole',
            minimumPlayersPerTeam:minimumPlayersPerTeam
        });
        this.olympicsEngine.randomizeTeams();
        this.olympicsEngine.buildBrackets();

    }
    static get styles() {
        return css`
        `;
    }


    render() {
        return html`
        <pre>
        ${this.olympicsEngine.toJsonString()}
        </pre>
        `;
    }
}
