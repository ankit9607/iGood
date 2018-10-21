import { Injectable } from '@angular/core';
import { DbService } from '../dbservice/db.service';
import { Activity } from '../../model/Activity';
import { DateService } from '../date/date.service';

@Injectable()
export class GraphService {

  constructor(
    private dbService : DbService,
    private dateService : DateService
  ) { }

  async getStrikesWithDuration(){

    let activity : Activity = await this.dbService.getSelectedActivity();

    activity.strikes.sort((a,b)=>{
      if(a.strikeDate>=b.strikeDate) return 1;
      return -1;
    });

    let labels : string[]=[];
    let data : number[]=[];
    let showdata : string[]=[];
    let backgroundColor : string[]=[];

    let dates : any;
    for(let i=0;i<activity.strikes.length;i++){
      labels.push(this.dateService.getReadableDateTimeFromMills(activity.strikes[i].strikeDate));
      data.push(this.dateService.getSecondsFromMills(activity.strikes[i].strikeDuration));
      showdata.push(this.dateService.getReadableMills(activity.strikes[i].strikeDuration));
      backgroundColor.push("rgba(63, 191, 63, 0.9)");
    }
    return { labels : labels, data : data, showdata : showdata, backgroundColor : backgroundColor };

  }

  async getDayFrequency(){
    let activity : Activity = await this.dbService.getSelectedActivity();
    let max : number = this.dateService.getHoursFromMills(activity.bestStrikeDuration);

    let labels : number[] = new Array<number>(max+1);
    let data : number[] = new Array<number>(max+1);

    for(let i=0;i<labels.length;i++){
      labels[i]=i;
      data[i]=0;
    }

    let j : number = 0;
    for(let i=0;i<activity.strikes.length;i++){
      j=this.dateService.getHoursFromMills(activity.strikes[i].strikeDuration);
      data[j]++;
    }

    return {labels : labels, data : data};

  }

}
