import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {

  data;

  count_box = 0;
  days = [
    { img: './assets/images/food3.jpg', no: '1', status: false, btn: true },
    { img: './assets/images/food3.jpg', no: '2', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '3', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '4', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '5', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '6', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '7', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '8', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '9', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '10', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '11', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '12', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '13', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '14', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '15', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '16', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '17', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '18', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '19', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '20', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '21', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '22', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '23', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '24', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '25', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '26', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '27', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '28', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '29', status: false, btn: false },
    { img: './assets/images/food3.jpg', no: '30', status: false, btn: false },
  ]

  constructor(
    private routerActive: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.routerActive.queryParams.subscribe(data => {
      if (data && data.item) {
        this.data = JSON.parse(data.item);
      }
    });
  }

  createDiv(num) {
    console.log("lock")
    this.days[num].status = true;
    this.days[num].btn = false
    this.days[num + 1].btn = true
  }

  gotoDetail(no) {
    this.router.navigate(['/member/menu/day'], { queryParams: { no: no } })
  }

}
