import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { NgForage } from '@ngforage/ngforage-ng5';
import { LocalForageService } from '../local-forage/local-forage.service';
import { DbService } from '../dbservice/db.service';
import { Activity } from '../../model/Activity';
import { Strike } from '../../model/Strike';

@Injectable()
export class SocketService {

  private socket;
  private dbID : Number;

  PATH : string = 'http://localhost:3000/';  
  isServerConnected : boolean;

  constructor(private readonly ngf: NgForage, private dbService : DbService) {  }

  connectToServer() : void {

    this.handShake();

    this.socket = io(this.PATH);

    this.socket.on('connect', ()=> {
      console.log('Server is connected.');
      this.isServerConnected = true;
    });

    this.socket.on('connect_error',()=>{
      console.log("Server is disconnected.");
      this.isServerConnected = false;
    });

    this.socket.on('init_db',(session)=>this.initDB(session));

    this.socket.on('handShake', (server_log)=>this.updateDB(server_log));

    this.socket.on('serverIsUpdatedByMyLocalRecord', (serverMod)=>this.serverIsUpdatedByMyLocalRecord(serverMod));

  }

  async pushEvent(event : string, ref_name : string, action : string, node : any) {
    
    if(event=='Activity') delete node.strikes;

    let data = {
      log:{
        log_for : this.dbID,
        event : event, 
        ref_name : ref_name,
        action : action,
        creationDate : new Date().getTime()
      },
      node : node
    };

    await this.saveLocal(data);
  }

  async saveLocal(data : any){
    let log = await this.ngf.getItem<any[]>('_Log');

    if(log!=null){
      log.push(data);
      await this.ngf.setItem('_Log', log);
    }
    else {
      await this.ngf.setItem('_Log', [data]);
    }

    await this.ngf.setItem('_Local_mod', data.log.creationDate);
  }

  // For first time user.
  async initDB(session) {
    this.dbID=session._db_id;    
    await this.ngf.setItem('_db_id',this.dbID);
    await this.ngf.setItem('_Server_mod',session._server_mod); 
  }

  async updateDB(server_log){
    let log : any;
    let node : any;
    for(let i=0;i<server_log.logs.length;i++){
      log = server_log.logs[i];
      node = server_log.node[i];
      if(log.log_for!=this.dbID){
        if(log.event=="Activity" && log.action == "Add"){
          let NewActivity : Activity = new Activity(log.ref_name);
          NewActivity.bestStrikeDuration = node.bestStrikeDuration;
          NewActivity.avgStrikeDuration = node.avgStrikeDuration;
          NewActivity.latestStrikeDate = node.latestStrikeDate;
          NewActivity.creationDate = node.creationDate;
          NewActivity.description = node.description;
          
          await this.dbService.addNewActivity(NewActivity);
        }
        else if(log.event=="Strike" && log.action=="Add"){
          let newStrike : Strike = new Strike(node.creationDate,node.strikeDate,node.strikeDuration);
          await this.dbService.addStrike(newStrike, log.ref_name);
        }
      }
    }

    await this.ngf.setItem('_Server_mod', server_log.serverMod);
    await this.ngf.setItem('_Local_mod',server_log.serverMod);//update local upto server_mod
    await this.socket.emit('updateLocalMod',{dbID : this.dbID, localMod : server_log.serverMod });
  }

  async handShake(){
    let _db_id = await this.ngf.getItem<Number>('_db_id');
    let _Log = await this.ngf.getItem<any>('_Log');
    let _Local_mod = await this.ngf.getItem<string>('_Local_mod');
    let _Server_mod = await this.ngf.getItem<string>('_Server_mod');

    this.dbID = _db_id;

    let req = {
      _db_id : _db_id,
      _log : _Log,
      _local_mod : _Local_mod,
      _server_mod : _Server_mod
    }

    await this.socket.emit('handShake', req);
  }

  async serverIsUpdatedByMyLocalRecord(serverLog){
    /*-----------------DELETE _Log ---------------------*/
    let localLog = await this.ngf.getItem<any>('_Log');
    if(localLog!=null){
      let i :number=0;
      for(i=0;i<localLog.length;i++){
        if(localLog[i].log.creationDate > serverLog.localMod)
          break;
      }
      localLog.splice(0,i);
      await this.ngf.setItem('_Log',localLog);

    }
    /*-----------------UPDATE _server_mod, _local_mod ---------------------*/
    await this.ngf.setItem('_Server_mod', serverLog.serverMod);
    let currentLocalMod : Number = await this.ngf.getItem<Number>('_Local_mod');
    if(currentLocalMod == serverLog.localMod)
      await this.ngf.setItem('_Local_mod',serverLog.serverMod);//update local upto server_mod
    else
      console.log('newRecord has been found! while server is updating local record to server.');
  }

}
