import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CommentService} from 'src/app/services/comment.service';
import { User, UserInit,Comment } from '../../interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  user: User = UserInit;

  comments: Comment[];
  commentInput: string;

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    public ngZone: NgZone
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    var uid = localStorage.getItem('uid')
    this.userService.getProfile(uid).subscribe(user => {
      this.user = user;
    })
    this.commentService.getComments(uid).subscribe(data => {
      console.log(data)
      this.comments = data;
    })
    console.log("------------------------- ", this.user.food)
  }

  send() {
    var uid = localStorage.getItem('uid')
    this.commentService.sentComment(uid, uid, this.commentInput)
    this.ngZone.run(() => {
      this.commentInput = ""
    })
  }
}
