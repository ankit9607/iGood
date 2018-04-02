import { Component, OnInit } from '@angular/core';
import { StrikeService } from '../../service/strike/strike.service';
import { LocalForageService } from '../../service/local-forage/local-forage.service';
import { Activity } from '../../model/Activity';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['../../../assets/style/chart.css','../../../assets/style/mdl.css', '../../../assets/style/mdc.ripple.css','../../../assets/style/mdc.ripple.css','./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  private selectedActivity : Activity = new Activity('InitActivity');
  private isRedirect : boolean = null;

  
  dayCountDown : string = "00";
  hourCountDown : string = "00";
  minuteCountDown : string = "00";
  secCountDown : string = "00";
  maxDay : number;
  avgDay : number;
  chartArcValue : number;

  constructor(private strikeService : LocalForageService) { }

  ngOnInit() {
    this.getSelectedActivity();
  }
  getSelectedActivity() : void {
    this.strikeService.getSelectedActivity().subscribe(selectedActivity => {
      this.selectedActivity=selectedActivity;
      if(this.selectedActivity.name == 'NoActivity'){
          this.isRedirect = true;
      }
      else{
        var self = this;
        self.maxDay = Math.floor((self.selectedActivity.bestStrikeDuration) / (1000*60*60*24));
        self.avgDay = Math.floor((self.selectedActivity.avgStrikeDuration) / (1000*60*60*24));
        setInterval(function(){
          var time = Date.now() - self.selectedActivity.latestStrikeDate;

          var chartValue = Math.floor((time / self.selectedActivity.bestStrikeDuration)*100);
          chartValue<100 ? self.chartArcValue=chartValue : self.chartArcValue=100;
          self.dayCountDown = self.getTwoDigit(Math.floor((time) / (1000*60*60*24)));
          var forHour = time % (1000*60*60*24);
          self.hourCountDown = self.getTwoDigit(Math.floor(forHour / (1000*60*60)));
          var forMinute = forHour % (1000*60*60);
          self.minuteCountDown = self.getTwoDigit(Math.floor(forMinute / (1000*60)));
          var forSec = forMinute % (1000*60);
          self.secCountDown = self.getTwoDigit(Math.floor(forSec / (1000)));
        },1000);
      }
    });
  }

  getTwoDigit(num : number) : string {
    if(num < 10 ) return "0"+num;
    else return ""+num;
  }

  async addStrike() {
    if(this.isRedirect!=true)
      await this.strikeService.addStrike(this.selectedActivity,new Date().getTime());
  }

}