import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { NgToastService} from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private ngToastService:NgToastService) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginFormGroup.value.email && a.password === this.loginFormGroup.value.password
        });
        if (user) {
          this.ngToastService.success({
            detail:"Login Success",
            summary:res.message,
            duration:5000,
          });
          //alert("Login Success");
          this.loginFormGroup.reset();
          this.router.navigate(['employee-dasboard']);
        } else {
          this.ngToastService.info({
            detail:"User not found",
            summary:res.message,
            duration:15000,
          });
         // alert("User not found");
        }

      }, err => {
        this.ngToastService.error({
          detail:"Some went wrong!!",
          summary:err.message,
          duration:15000,
        });
       // alert("Some went wrong!!");
      })
  }

}
