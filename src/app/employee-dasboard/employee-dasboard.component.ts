import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ApiService} from '../shared/api.service'
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dasboard',
  templateUrl: './employee-dasboard.component.html',
  styleUrls: ['./employee-dasboard.component.css']
})
export class EmployeeDasboardComponent implements OnInit {
  title = "employee-dasboard.component.html";

  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder: FormBuilder, private api:ApiService) {

  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      emailId: [''],
      mobileNo: [''],
      salary: ['']
    })
    this.getEmployeeDetaills();
  }

  clickAddEmployee()
  {
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeeDetails()
  {
    
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.emailId=this.formValue.value.emailId;
    this.employeeModelObj.mobileNo=this.formValue.value.mobileNo;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj).subscribe(res=>{
    console.log(res);
    alert("Employee Added Successfully");
    let ref = document.getElementById('calcel');
    ref?.click();
    this.formValue.reset();
    this.getEmployeeDetaills();
    },
    err=>{
      alert("Some went wrong");
    })
  }

  getEmployeeDetaills()
  {
    this.api.getEmploye().subscribe(g_res=>{
      this.employeeData=g_res;
    })
  }

  deleteEmployeeRecord(row:any)
  {
    debugger;
    this.api.deleteEmploye(row.id)
    .subscribe(res=>{
      alert(row.id + " Employee deleted");
      this.getEmployeeDetaills();
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['emailId'].setValue(row.emailId);
    this.formValue.controls['mobileNo'].setValue(row.mobileNo);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails()
  {
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.emailId=this.formValue.value.emailId;
    this.employeeModelObj.mobileNo=this.formValue.value.mobileNo;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.updateEmploye(this.employeeModelObj, this.employeeModelObj.id) 
    .subscribe(res=>{
      alert("Employee updated Successfully");
      let ref = document.getElementById('calcel');
      ref?.click();
      this.formValue.reset();
      this.getEmployeeDetaills();

    })
  }

}
