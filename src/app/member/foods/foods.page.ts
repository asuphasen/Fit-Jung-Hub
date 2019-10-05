import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.page.html',
  styleUrls: ['./foods.page.scss'],
})
export class FoodsPage implements OnInit {

  foods = []

  constructor(private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.ngZone.run(() => {
      this.foods = [
        { menu_name: 'keto diet', img: './assets/images/food1.jpg' },
        { menu_name: 'keto diet', img: './assets/images/food2.jpg' },
        { menu_name: 'keto diet', img: './assets/images/food3.jpg' },
        { menu_name: 'keto diet', img: './assets/images/food4.jpg' },
        { menu_name: 'keto diet', img: './assets/images/food5.jpg' },
      ]
    })

  }

  gotoDetail(item) {
    let obj = JSON.stringify(item)
    this.router.navigate(['/member/menu/food-detail'], { queryParams: { item: obj } })
  }

}
