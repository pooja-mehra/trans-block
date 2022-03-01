import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import {DashboardService} from './services/dashboard.service'
import { Topics } from './shared/topics'
declare let window: any;
declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  web3Provider:any;
  web3:any;
  account:string='';
  topics:Topics[] =[];
  test:Topics[]=[];

  constructor(private dashboardService:DashboardService){
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
      console.log(this.web3Provider)
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    window.web3 = new Web3(this.web3Provider);
    this.web3 = window.web3;

    let that = this
    window.web3.eth.getAccounts(function(err:any, accounts:any) {
      if (err != null) {
        alert("Error retrieving accounts.");
        return;
      }
      if (accounts.length == 0) {
        alert("No account found! Make sure the Ethereum client is configured properly.");
        return;
      }
      window.web3.eth.defaultAccount = that.account;
      that.getTopics()
    });
  }

  getTopics = () => {
    let that = this
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

  ngOnInit(){
    
  }
}
