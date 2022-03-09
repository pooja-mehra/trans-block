import { Component, OnInit } from '@angular/core';
import { PricingService } from 'src/app/services/pricing.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  latestPrice:any = Number.MAX_SAFE_INTEGER;
  timer:any;
  constructor(private pricingService:PricingService, private _snackBar:MatSnackBar) {
    this.getLatestPrice();
   }

  ngOnInit(): void {
    let that = this;
    this.timer = setInterval(function(){
      that.getLatestPrice();
    },50000
    )
   
  }
   
  getLatestPrice(){
    let that = this;
    this.pricingService.getLatestPrice().then( function(result:any) {
        if(result.result == false){
          clearInterval(that.timer)
        } else
        {
          if( that.latestPrice != result.result.price){
            that.latestPrice = result.result.price;
            that.pricingService.latestPriceSource.next(that.latestPrice)
            that._snackBar.openFromComponent(snackBarComponent, {
              duration:1000,
            });
          }
        }
    })
  }
}

@Component({
  selector: 'snack-bar',
  template: `
  <p>
    ETH/USD: $ {{latestPrice}}
  </p>
`,
  styles: [],
})
export class snackBarComponent {
  latestPrice:any
  constructor(private pricingService:PricingService){
      this.latestPrice = this.pricingService.latestPriceSource.getValue();
    }
}