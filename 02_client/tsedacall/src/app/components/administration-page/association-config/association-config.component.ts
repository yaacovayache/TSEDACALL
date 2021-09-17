import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-association-config',
  templateUrl: './association-config.component.html',
  styleUrls: ['./association-config.component.scss']
})
export class AssociationConfigComponent implements OnInit {
  public userSubscription = new Subscription();
  public currentUser:User;
  public newPhoto;
  public pattern_url = environment.apiUrl + 'profile/'

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserById(this.authService.getLocalStorageUser()._id).subscribe((user)=>{
      this.currentUser = user;
    })
  }

  onSave(){
    this.userService.updateUserById(this.currentUser._id, {item:this.currentUser}).subscribe((user)=>{
    })
  }

  onChangeProfile(event) {
    if (event.target.value){
      this.newPhoto = <File>event.target.files[0];
      let fd = new FormData();
      fd.append('newPhotoProfile', this.newPhoto, this.newPhoto.name);
      this.userService.updateProfilePicture(fd, this.currentUser._id).subscribe((res) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/administration/config']);
        }); 
      })
    }
  }

}
