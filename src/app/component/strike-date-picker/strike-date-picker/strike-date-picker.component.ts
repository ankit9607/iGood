import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { LocalForageService } from '../../../service/local-forage/local-forage.service';
import { Activity } from '../../../model/Activity';
import { Router } from '@angular/router';

const now = new Date();

@Component({
  selector: 'app-strike-date-picker',
  templateUrl: './strike-date-picker.component.html',
  styleUrls: ['./strike-date-picker.component.css']
})
export class StrikeDatePickerComponent implements OnInit {

  time = {hour: now.getHours(), minute: now.getMinutes()};
  model: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth(), day: now.getDate()};
  date : {year: number, month: number};
  chooseDate : Date;
  selectedActivity : Activity;

  constructor(
    private strikeService : LocalForageService,
    private router : Router
  ) { }

  ngOnInit() {
    this.chooseDate = new Date(this.model.year, this.model.month, this.model.day, this.time.hour, this.time.minute, 0, 0);
    this.strikeService.getSelectedActivity().subscribe((act)=>this.selectedActivity=act);
  }

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth(), day: now.getDate()};
  }

  async addStrike() { 
    this.chooseDate = new Date(this.model.year, this.model.month, this.model.day, this.time.hour, this.time.minute, 0, 0);
    console.log("chooseDate for Strike : "+this.chooseDate);
    await this.strikeService.addStrike(this.selectedActivity,this.chooseDate.getTime());
    this.router.navigate(['']);
  }

}
