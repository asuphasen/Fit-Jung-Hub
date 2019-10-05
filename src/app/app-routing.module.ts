import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthMemberGuardService } from './services/auth-member-guard.service';
import { AuthTrainerGuardService } from './services/auth-trainer-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { 
    path: 'member', 
    loadChildren: './member/member.module#MemberPageModule' ,
    canActivate: [AuthMemberGuardService]
  },
  { 
    path: 'trainer', 
    loadChildren: './trainer/trainer.module#TrainerPageModule' ,
    canActivate: [AuthTrainerGuardService]
  },
  { 
    path: 'public', 
    loadChildren: './public/public.module#PublicPageModule' ,
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
