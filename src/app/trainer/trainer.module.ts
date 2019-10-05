import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TrainerPage } from './trainer.page';

const routes: Routes = [
  {
    path: 'menu',
    component: TrainerPage,
    children:[
      { path: 'home', loadChildren: './home/home.module#HomePageModule' },
      { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
      { path: 'map', loadChildren: './map/map.module#MapPageModule' }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/home',
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
  declarations: [TrainerPage]
})
export class TrainerPageModule {}
