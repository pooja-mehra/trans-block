import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import {DashboardService} from './services/dashboard.service'
import { Topics } from './shared/topics'
declare let window: any;
const { ethereum } = window;

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
    this.web3Provider = window.web3.currentProvider;
    ethereum.web3 = new Web3(this.web3Provider);
    this.web3 = ethereum.web3;
    this.getTopics();
  }

  ngOnInit(){
    
  }

  async getAccount(){
    let accounts = await ethereum.request({ method: 'eth_accounts' });
    this.account =accounts[0];
  }

  async getTopics(){
    await this.getAccount();
    let that = this
    this.dashboardService.getTopics(this.web3Provider,this.account).then(function (result:any){
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
