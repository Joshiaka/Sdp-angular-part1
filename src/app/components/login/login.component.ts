import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  data: any;
  doNotMatch: boolean;

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private http: HttpClient
               ) {}

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      studentID: ['', Validators.required],
      loginPassword: ['', Validators.required]
   });
  }

  submitLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      console.log(this.loginForm.value);
      const studentID = this.loginForm.value.studentID;
      this.getStudent(studentID);
      console.log(this.data);
    }
  }


  getStudent(id) {
    return this.http.get('http://localhost:3000/api/users/' + id).toPromise()
    .then((response: any) => {
      this.data = response;
      if (response.password === this.loginForm.value.loginPassword) {
        this.router.navigate(['/student-details', id]);
      } else { this.doNotMatch = true; }
    })
    .catch(console.log);
  }

  register() {
    this.router.navigate(['/register']);
  } 
  
}
