import { Component, OnInit } from '@angular/core';
import { Activity } from '../../model/Activity';
import { LocalForageService } from '../../service/local-forage/local-forage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent implements OnInit {

  private newActivity : Activity = new Activity('');

  constructor(
    private strikeService : LocalForageService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  async addNewActivity() {
    if(this.newActivity.name!=''){
    this.newActivity.creationDate = new Date().getTime();
    this.newActivity.latestStrikeDate = this.newActivity.creationDate;
    await this.strikeService.addNewActivity(this.newActivity);
    this.router.navigate(['']);
    }
    else{
      alert('Enter Activity Name');
    }
  }

}
