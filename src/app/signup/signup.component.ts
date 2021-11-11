import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private service: DataService,) {
     }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
 // convenience getter for easy access to form fields
 get f():any { return this.registerForm.controls; }

 onSubmit() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.registerForm.invalid) {
         return;
     }

     this.loading = true;
     this.service.signUp({username:this.f.username.value, password:this.f.password.value})
         .pipe(first())
         .subscribe(
             (data:any) => {
                 this.router.navigate(['/login']);
             },
             (error:any) => {
                 this.loading = false;
                 throw Error(error)
             });
 }
}
