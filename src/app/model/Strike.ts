export class Strike {

    creationDate : number;
    strikeDate : number;
    strikeDuration : number;

    constructor(creationDate : number, strikeDate : number, strikeDuration : number){
        this.creationDate = creationDate;
        this.strikeDate = strikeDate;
        this.strikeDuration = strikeDuration;
    };
}