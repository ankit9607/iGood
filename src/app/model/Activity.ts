import { Strike } from "./Strike";

export class Activity {
    name : string;
    description : string = "";
    bestStrikeDuration : number = 0;
    avgStrikeDuration : number = 0;
    latestStrikeDate : number = 0;
    creationDate : number = 0;
    strikes : Strike[] = [];

    constructor(name : string) {
        this.name=name;
     }


} 