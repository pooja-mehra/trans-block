import { Component, OnInit } from '@angular/core';
import { PushnotificationService } from '../../services/pushnotification.service'
import { environment} from '../../../environments/environment';
const public_key = environment.PUBLIC_KEY;
 
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  isPushNotification = false;
  
  constructor(private pushnotificationService:PushnotificationService) { 
    localStorage.setItem("isPushNotification", JSON.stringify(this.isPushNotification));
  }

  ngOnInit(): void {
  }

  setPushNotification(event){
    try{
    let isPushNotification = localStorage.getItem("isPushNotification")
    this.isPushNotification = isPushNotification == 'true'?true:false
    } catch(e){
      e = 'error';
      console.log(e);
    }
    event.checked = !this.isPushNotification
    this.isPushNotification = !this.isPushNotification
    localStorage.setItem("isPushNotification", JSON.stringify(this.isPushNotification));
    if(this.isPushNotification  == true){
     
    }
  }
}
