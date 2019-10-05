import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User, UserInit } from '../../interface';
@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.page.html',
  styleUrls: ['./create-trainer.page.scss'],
})
export class CreateTrainerPage implements OnInit {
  password: string;

  user: User = UserInit;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  save() {
    this.authService.createUser(this.user.email, this.password, "trainer", this.user)
  }
}
