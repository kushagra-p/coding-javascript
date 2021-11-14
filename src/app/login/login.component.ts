import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  loginCheck=false
  @Output() loginEmitter = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service:DataService) {
    }

  ngOnInit(): void {
    
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/team/create';
  }
   // convenience getter for easy access to form fields
   get f():any { return this.loginForm.controls; }
   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.service.getToken({username:this.f.username.value, password:this.f.password.value})
        .pipe(first())
        .subscribe(
            (data:any) => {
                this.router.navigate([this.returnUrl]);
            },
            (error:any) => {
                this.loading = false;
                throw Error(error)
            });
            let token=this.service.getLoggedInToken()
            this.service.getUser(token)
            this.loginCheck=true
            this.loginEmitter.emit({check:this.loginCheck.toString()}); 
}

}
