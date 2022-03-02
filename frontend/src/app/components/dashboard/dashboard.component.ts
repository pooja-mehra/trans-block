import { Component, Input, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['topicId', 'topicName','upVote', 'downVote'];
  @Input() web3:any;
  @Input() web3Provider:any
  @Input() account:any
  @Input() topics:any;
  isTopicValid:boolean = false;
  upVote:number =0;
  topic = new FormControl('', [Validators.required]);

  constructor(private dashboardService:DashboardService, public dialog: MatDialog) { 
    
  }

  ngOnInit(){
  }
  
  getErrorMessage() {
      return 'You must enter a topic';
  }

  addNewTopic(){
    let that = this
    this.dashboardService.setNewTopic(this.topic.value, this.web3Provider, this.account).then(function(result:any ) {
      that.topics = result.result;
      result.result.forEach(element => {
        that.dashboardService.getVote(element.topicId, that.web3Provider).then(function (vote:any){
          that.topics[element.topicId].upVote = vote.vote[0].words[0]
          that.topics[element.topicId].downVote = vote.vote[1].words[0]
      }); 
    })
    })
  }

  setVote(topicId,voted){
    let vote:boolean = true;
    if(voted == 'up'){
      vote = true;
    }
    if(voted == 'down'){
      vote = false;
    }
    let that = this;
    this.dashboardService.setVote(topicId,vote,this.web3Provider, this.account).then(function(result:any) {
      if(result.isVoted && result.isVoted == true){
        alert('can not vote again');
      }else{
      that.topics[topicId].upVote = result.vote[0].words[0];
      that.topics[topicId].downVote = result.vote[1].words[0];
      }
    })
  }
}
