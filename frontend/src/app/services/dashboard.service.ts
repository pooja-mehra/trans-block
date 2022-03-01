import { Injectable } from '@angular/core';
import {Topics} from '../shared/topics';

var contract = require("truffle-contract");
declare let require: any;
declare let window: any;
let categoryToken = require('../../../../build/contracts/Category.json');
let opinionToken = require('../../../../build/contracts/Opinion.json')

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  topics:Topics[] =[];
  categoryContract = contract(categoryToken);
  opinionContract = contract(opinionToken);
  constructor() { }

  getTopics(web3Provider:any){
    let that = this
    that.topics =[];
    this.categoryContract.setProvider(web3Provider);
      return new Promise((resolve, reject) =>{
        this.categoryContract.deployed().then(function(instance:any) {
          instance.getTopics().then( function(returnedTopics) {
                return   resolve({'result':returnedTopics})
            });
        });
      })
}

  setNewTopic(newTopic:any, web3Provider:any,account:any) {
    let that = this
    that.topics =[];
    this.categoryContract.setProvider(web3Provider);
      return new Promise((resolve, reject) =>{
        this.categoryContract.deployed().then(function(instance:any) {
          instance.setTopics (newTopic, {from: account}).then( function() {
              instance.getTopics().then( function(returnedTopics) {
                return  resolve({'result':returnedTopics})
            }) 
          }); 
        });
      })
  }

  setVote(topicId:number, vote:any,web3Provider:any,account:any){
    this.opinionContract.setProvider(web3Provider);
      return new Promise((resolve, reject) =>{
        this.opinionContract.deployed().then(function(instance:any) {
          instance.checkVote(topicId,{from: account}).then(function(isVoted){
              if(isVoted == true){
                console.log('yes')
                return resolve({'isVoted':isVoted})
              } else{
                instance.setVote (topicId, vote, {from: account}).then(function(){
                  instance.getVote(topicId).then(function(vote){
                    console.log(vote)
                    return resolve ({'vote': vote})
                  })
                })
              } 
          })
          }); 
        });
  }

  getVote(topicId:number, web3Provider:any){
    this.opinionContract.setProvider(web3Provider);
      return new Promise((resolve, reject) =>{
        this.opinionContract.deployed().then(function(instance:any) {
         instance.getVote(topicId).then(function(vote){
              return resolve ({'vote': vote})
            })
          }); 
        });
  }
}
