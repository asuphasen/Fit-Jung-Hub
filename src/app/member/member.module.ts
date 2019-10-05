import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemberPage } from './member.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MemberPage,
    children:[
      { path: 'foods', loadChildren: './foods/foods.module#FoodsPageModule' },
      { path: 'food-detail', loadChildren: './food-detail/food-detail.module#FoodDetailPageModule' },
      { path: 'trainer-list', loadChildren: './trainer-list/trainer-list.module#TrainerListPageModule' },
      { path: 'day', loadChildren: './food-detail/day/day.module#DayPageModule' },
      // { path: 'trainer-detail', loadChildren: './trainer-detail/trainer-detail.module#TrainerDetailPageModule' }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/trainer-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MemberPage]
})
export class MemberPageModule {}
