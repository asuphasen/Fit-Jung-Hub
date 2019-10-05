import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  animations: [
    trigger('OpenIn', [
      transition(':enter', [
        style({ height: '*', opacity: 0 }),
        animate('.3s ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('.3s ease-out', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
  ]
})
export class FilterPage implements OnInit {

  range_km: any;
  type: any;
  food: any;
  sex: any;
  age: any = {
    upper: 0,
    lower: 0
  };

  tabs = [false, false, false, false, false]

  customPopoverOptionsType: any = {
    header: 'Select Type',
    translucent: true
  };
  customPopoverOptionsFood: any = {
    header: 'Select Food',
    translucent: true
  };

  constructor(private modalCtrl: ModalController,
    private navParams: NavParams) {

  }

  ngOnInit() {
  }

  cancel() {
    this.modalCtrl.dismiss()
  }
  confirm() {
    console.log("confirm")
    this.modalCtrl.dismiss({ data: { range_km: this.range_km, tpye: this.type, food: this.food, sex: this.sex, age: this.age } })
  }

  open(num) {
    if (this.tabs[num]) {
      this.tabs[num] = !this.tabs[num];
    } else {
      for (let i in this.tabs) {
        this.tabs[i] = false;
      }
      this.tabs[num] = !this.tabs[num];
    }
    console.log(this.tabs[num])
  }
}
