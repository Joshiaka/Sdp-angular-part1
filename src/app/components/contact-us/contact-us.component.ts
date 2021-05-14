import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  inquiryForm: FormGroup;
  submitted: boolean = false;
  formSubmittedSuccessfully: boolean = false;

  constructor( private formBuilder: FormBuilder,
               private http: HttpClient
               ) {}

  get f() { return this.inquiryForm.controls; }

  ngOnInit(): void {
    this.inquiryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      inquiry: ['', Validators.required]
   });
  }

  submitInquiry() {
    this.submitted = true;

    if (this.inquiryForm.invalid) {
      return;
    } else {
      console.log(this.inquiryForm.value);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      this.http.post('http://localhost:3000/api/contact/', 
      {Email: this.inquiryForm.value.email, inqriry: this.inquiryForm.value.inquiry},
      httpOptions).toPromise()
                  .then(response => this.formSubmittedSuccessfully = true)
                  .catch(console.log);
    }
  }

}
