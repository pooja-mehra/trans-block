import { Injectable } from '@angular/core';
import {Topics} from '../shared/topics';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
  constructor(private httpClient:HttpClient) { }

  async getTopics(web3Provider:any){
    let that = this
    that.topics =[];
    await this.categoryContract.setProvider(web3Provider);
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
                return resolve({'isVoted':isVoted})
              } else{
                instance.setVote (topicId, vote, {from: account}).then(function(){
                  instance.getVote(topicId).then(function(vote){
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

  /*getWeb3Provider(){
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/web3provider')
        .toPromise()
        .then(
          res => {
            return resolve({'result':res});
          }
        );
    });
}*/
  
}
