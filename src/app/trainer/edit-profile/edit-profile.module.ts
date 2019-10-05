import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditProfilePage } from './edit-profile.page';

import { Camera } from '@ionic-native/camera/ngx';



const routes: Routes = [
  {
    path: '',
    component: EditProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditProfilePage],
  providers:[Camera]

})
export class EditProfilePageModule {}
