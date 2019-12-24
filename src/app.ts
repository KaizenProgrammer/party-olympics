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

        this.olympicsEngine.addGame({
            id:'ping-pong',
            name:'Ping Pong',
            minimumPlayersPerTeam:4
        });
        this.olympicsEngine.addGame({
            id:'cornhole',
            name:'Cornhole',
            minimumPlayersPerTeam:4
        });
        this.olympicsEngine.addGame({
            id:'Mario Kart',
            name:'Mario Kart',
            minimumPlayersPerTeam:4
        });
        
        this.olympicsEngine.addGame({
            id:'bowling',
            name:'Bowling',
            minimumPlayersPerTeam:4
        });
        
        this.olympicsEngine.addGame({
            id:'cornhole',
            name:'Cornhole',
            minimumPlayersPerTeam:4
        });
        this.olympicsEngine.randomizeTeams();

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
