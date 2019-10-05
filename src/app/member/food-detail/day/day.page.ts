import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class DayPage implements OnInit {
  no;
  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.queryParams.subscribe(no => {
      this.no = no.no
      console.log("no------", no)
    })
  }

}
