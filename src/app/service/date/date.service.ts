import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  private monthNames : string[] = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"];

  constructor() { }

  getReadableDateFromMills(mills : number) : string{
    let dates = new Date(mills);
    return this.monthNames[dates.getMonth()]+" "+ dates.getDate()+", "+dates.getFullYear();
  }

  getReadableDateTimeFromMills(mills : number) : string{
    let dates = new Date(mills);
    return this.monthNames[dates.getMonth()]+" "+ dates.getDate()+", "+dates.getFullYear()+" "+this.getTwoDigit(dates.getHours())+":"+this.getTwoDigit(dates.getMinutes());
  }

  getReadableMills(mills : number) : string{
    let out : string="";
    out += this.isShow(Math.floor(mills / (1000*60*60*24*365)),"Year");
    let forMonth : number  = mills % (1000*60*60*24*365);
    out += this.isShow(Math.floor(forMonth / (1000*60*60*24*30)),"Month");
    let forWeek : number = forMonth %  (1000*60*60*24*30);
    out += this.isShow(Math.floor(forWeek / (1000*60*60*24*7)),"Week");
    let forDay : number = forWeek % (1000*60*60*24*7);
    out += this.isShow(Math.floor(forDay / (1000*60*60*24)),"Day");
    let forHour : number = forDay % (1000*60*60*24);
    out += this.isShow(Math.floor(forHour / (1000*60*60)),"Hour");
    let forMinute : number = forHour % (1000*60*60);
    out += this.isShow(Math.floor(forMinute / (1000*60)),"Min");
    let forSec : number = forMinute % (1000*60);
    out += this.isShow(Math.floor(forSec / (1000)),"Sec");
    return out;
  }
  /*-----------------------------------BASIC FUNCTIONS------------------------------*/

  getDaysFromMills(mills) : number{
    return Math.floor(mills / (1000*60*60*24));
  }
  getHoursFromMills(mills : number) : number{
    return Math.floor(mills/(1000*60*60));
  }

  getMinutesFromMills(mills : number) : number{
    return Math.floor(mills/(1000*60));
  }

  getSecondsFromMills(mills :number) : number{
    return Math.floor(mills/1000);
  }

  /*----------------------------------INTERNAL SUPPORT FUNCTIONS--------------------------*/
  public getTwoDigit(n : number) : string {
    if(n<10) return "0"+n;
    return ""+n;
  }
  
  private isShow(n : number , s : string) : string{
    if(n==0) return "";
    return n+" "+s+" ";
  }
}
