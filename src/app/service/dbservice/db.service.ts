import { Injectable } from '@angular/core';
import { NgForage } from '@ngforage/ngforage-ng5';
import { Activity } from '../../model/Activity';
import { Strike } from '../../model/Strike';

@Injectable()
export class DbService {

  constructor(private readonly ngf: NgForage) { }

  async addNewActivity(newActivity : Activity) {
    
    let activities = await this.ngf.getItem<string[]>('Activities');

    if(activities!=null){
      activities.push(newActivity.name);
      await this.ngf.setItem('Activities', activities);
    }
    else {
      await this.ngf.setItem('Activities', [newActivity.name]);
    }
    await this.ngf.setItem(newActivity.name,newActivity);
    let selectedActivityName = await this.getSelectedActivityName();
    if(selectedActivityName==null)
      await this.ngf.setItem('selectedActivityName', newActivity.name);
   }

   async addStrike(strike : Strike, activityName: string){
      let activity : Activity = await this.getActivityByName(activityName);
      activity.strikes.push(strike);
      await this.ngf.setItem(activity.name,activity);
    }

    async getSelectedActivityName(){
      return await this.ngf.getItem<string>('selectedActivityName');
    }

    async getActivityByName(name){
      return await this.ngf.getItem<Activity>(name);
    }

    async getSelectedActivity() {
      return this.getActivityByName(await this.getSelectedActivityName());
    }

    async updateActivity(activity){
      await this.ngf.setItem(activity.name,activity);
    }

}
