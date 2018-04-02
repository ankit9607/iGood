import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { NgForage } from '@ngforage/ngforage-ng5';
import 'rxjs/add/observable/fromPromise';
import { Activity } from '../../model/Activity';
import { Strike } from '../../model/Strike';

@Injectable()
export class LocalForageService {

  constructor(private readonly ngf: NgForage) { }


/* Getter */

  getSelectedActivity() : Observable<Activity> {
    var self = this;
    var myObservable = new Observable<Activity>(ob => {

      self.getSelectedActivityName().subscribe(name => {
        if(name!=null){
          //fetch selectedActivity;
          Observable.fromPromise(self.getActivityByName(name)).subscribe(activity => ob.next(activity));;
        }
        else{ 
          ob.next(new Activity('NoActivity'));
        }
      });
    });
    return myObservable;
  }

  getSelectedActivityName() : Observable<string> {    
    return Observable.fromPromise(this.ngf.getItem<string>('selectedActivityName'));
  }

  async getActivityByName(name){
    return await this.ngf.getItem<Activity>(name);
  }

  async addNewActivity(newActivity) {
    let activities = await this.ngf.getItem<Activity[]>('Activities');

    if(activities!=null){
      activities = await this.ngf.getItem<Activity[]>('Activities');
      activities.push(newActivity.name);
    }
    else {
      await this.ngf.setItem('Activities', [newActivity.name]);
    }
    await this.ngf.setItem('selectedActivityName', newActivity.name);
    await this.ngf.setItem(newActivity.name,newActivity);
  }


  async addStrike(activity: Activity, strikeDate : number){
    let nowDate = new Date().getTime();
    if(strikeDate > activity.latestStrikeDate){
      let strike = new Strike(nowDate, strikeDate,(strikeDate-activity.latestStrikeDate));
      activity.strikes.push(strike);
      activity.latestStrikeDate = strike.strikeDate;
      if(activity.bestStrikeDuration < strike.strikeDuration) activity.bestStrikeDuration = strike.strikeDuration;
    }else{
      let strike = new Strike(nowDate, strikeDate,0);
      activity.strikes.push(strike);
      // need neo4j for max strike logic.
    }
    // call neo4j for avg strike logic.
    await this.ngf.setItem(activity.name,activity);
  }


}
