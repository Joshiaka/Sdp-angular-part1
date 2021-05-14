import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;
  data: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params.id;
    });

    this.getData();
    console.log('id is' + this.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getData() {
    this.http.get('http://localhost:3000/api/students/' + this.id).subscribe(data => this.data = data);
  }
}
