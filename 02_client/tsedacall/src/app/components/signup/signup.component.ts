import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public user: User;
  public signUpForm: FormGroup;
  isLoading: boolean = false;
  
  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl(''),
      address: new FormControl(''),
      zip: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      associationName: new FormControl(''),
    });
  }

  public onSubmit() {
    const userCredentials = {
      fname: this.signUpForm.get('fname').value,
      lname: this.signUpForm.get('lname').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
      role: this.signUpForm.get('role').value,
      telephone: this.signUpForm.get('telephone').value,
      address: this.signUpForm.get('address').value,
      zip: this.signUpForm.get('zip').value,
      city: this.signUpForm.get('city').value,
      country: this.signUpForm.get('country').value,
      associationName: this.signUpForm.get('associationName').value,
    };
    
    console.log(userCredentials)
    this.AuthService.SignUp(userCredentials).subscribe(
      (res) => {
        console.log(res)
        this.isLoading = true;
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 500)
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
