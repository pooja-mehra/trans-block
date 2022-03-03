import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import {DashboardService} from './services/dashboard.service'
import { Topics } from './shared/topics'
declare let window: any;
const { ethereum } = window;
import { environment} from '../environments/environment'
const default_web3_provider = environment.DEFAULT_WEB3_PROVIDER;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'frontend';
  web3Provider:any;
  web3:any;
  account:any;
  topics:Topics[] =[];
  test:Topics[]=[];
  
  constructor(private dashboardService:DashboardService){
   
    try {
      window.web3.currentProvider;
      this.web3Provider = window.web3.currentProvider;
      ethereum.web3 = new Web3(this.web3Provider);
      this.web3 = ethereum.web3;
    } catch(e) {
      e = 'Install Metamask for write access'
      alert(e);
      this.web3Provider = new Web3.providers.HttpProvider(default_web3_provider);
      window.web3 = new Web3(this.web3Provider);
      this.web3 = window.web3;
    }
    this.getTopics();
  }

  ngOnInit(){
    
  }

  async getAccount(){
    try{
      let accounts = await ethereum.request({ method: 'eth_accounts' });
      this.account = accounts[0];
    }
    catch(e){
      this.account = undefined;
    }
  }

  async getTopics(){
    let that = this
    await this.getAccount();
    this.dashboardService.getTopics(this.web3Provider).then(function (result:any){
      that.topics = result.result;
      result.result.forEach(element => {
        that.dashboardService.getVote(element.topicId, that.web3Provider).then(function (vote:any){
          that.topics[element.topicId].upVote = vote.vote[0].words[0]
          that.topics[element.topicId].downVote = vote.vote[1].words[0]
      }); 
    })
  })
  }
}
