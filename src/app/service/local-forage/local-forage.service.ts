import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { NgForage } from '@ngforage/ngforage-ng5';
import 'rxjs/add/observable/fromPromise';
import { Activity } from '../../model/Activity';
import { Strike } from '../../model/Strike';
import { SocketService } from '../socket/socket.service';
import { DbService } from '../dbservice/db.service';

@Injectable()
export class LocalForageService {

  constructor(private readonly ngf: NgForage, private socketService : SocketService, private dbService : DbService) { }


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
    return await this.dbService.getActivityByName(name);
  }
  /*--------------------SETTER----------------------------------------*/
  async addNewActivity(newActivity : Activity) {
    await this.dbService.addNewActivity(newActivity);
    await this.ngf.setItem('selectedActivityName', newActivity.name);
    await this.socketService.pushEvent('Activity',newActivity.name,'Add',newActivity);

  }


  async addStrike(activity: Activity, strikeDate : number){
    //Need to Store Strike Duration Now.
    // Or call Server to update Strike Duration when connected.

    //Need to update avg,latest,max strikes in Activity.
    //Or call Now as same need to update to frontend Now.
    let nowDate = new Date().getTime();
    let strike;
    if(strikeDate > activity.latestStrikeDate){
      strike = new Strike(nowDate, strikeDate,(strikeDate-activity.latestStrikeDate));
      activity.strikes.push(strike);
      activity.latestStrikeDate = strike.strikeDate;
      if(activity.bestStrikeDuration < strike.strikeDuration) activity.bestStrikeDuration = strike.strikeDuration;
      console.log('LatestStrike Add.');
    }else{
      strike = new Strike(nowDate, strikeDate,0);
      activity.strikes.push(strike);
      console.log('this Strike will be store in previous record, LatestStrike will remain same.');
      // need neo4j for max strike logic.
    }
    // call neo4j for avg strike logic.

    // Save Locally -- WE arready add Strike into Activity.
    await this.dbService.updateActivity(activity);
    // Save Log for server
    await this.socketService.pushEvent('Strike',activity.name,'Add',strike);
  }


}
