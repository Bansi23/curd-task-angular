import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from '../service/common-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { log } from 'util';
const emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}';

@Component({
  selector: 'app-crud-demo',
  templateUrl: './crud-demo.component.html',
  styleUrls: ['./crud-demo.component.css']
})
export class CrudDemoComponent implements OnInit {

  lstStudentData: any = [];
  updateIndex: number = -1;
  editData: any = null;
  isdisabled: boolean = true;
  isChecked: boolean = true;
  @ViewChild('addRecord') addRecordModal: ModalDirective;

  studentForm: FormGroup;

  fbStudent() {
    this.studentForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      mail: ['', Validators.compose([Validators.required, Validators.pattern(emailPattern)])],
      clan: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,1}')])],
      java: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,1}')])],
      asp: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,1}')])],
    });
  }

  DeleteRecord(index) {
    if (confirm(" Are you sure you want to delete this record?")) {
      this.lstStudentData.splice(index, 1);
    }
  }
  AddRecord() {
    this.studentForm.reset();
    this.addRecordModal.show();
  }
  add_Record() {
    for (let val in this.studentForm.controls) {
      this.studentForm.controls[val].markAsTouched();
    };
    if (this.studentForm.valid) {
      let StudentForm = this.studentForm.value;
      console.log(StudentForm, 'StudentForm')
      const index = this.lstStudentData.findIndex(x => x.id == StudentForm.id);
      if (index > -1) {
        this.lstStudentData.splice(index, 1, StudentForm);
      } else {
        StudentForm.id = (new Date()).getTime();
        this.lstStudentData.push(StudentForm);
        this.lstStudentData.map(x => {
          x.total = +x.java + +x.clan + +x.asp,
            x.per = x.total / 3,
            x.grade = x.per <= 35 ? 'fail' : x.per <= 40 ? 'C' : x.per <= 70 ? 'B' : x.per < 80 ? 'A' : 'A',
            x.isselect = this.isChecked
          if (x.grade == 'fail') {
            x.isselect = true;
          }
          else {
            x.isselect = false;
          }
        });
      }
      this.close();
    }
  }
  editRecord(index) {
    this.updateIndex = index;
    if (index > -1) {
      let data = this.lstStudentData[index];
      this.lstStudentData[index] = {
        fname: data.fname,
        lname: data.lname,
        mail: data.mail,
        clan: data.clan,
        java: data.java,
        asp: data.asp,
        total: data.total,
        per: data.per,
        grade: data.grade,
        isselect: data.isselect
      };
      this.editData = {
        fname: data.fname,
        lname: data.lname,
        mail: data.mail,
        clan: data.clan,
        java: data.java,
        asp: data.asp,
        total: data.total,
        per: data.per,
        grade: data.grade,
        isselect: data.isselect
      };
    };
  };


  saveChange(index) {
    if (this.studentForm.valid) {
      this.lstStudentData.map(x => {
        x.total = +x.java + +x.clan + +x.asp,
          x.per = x.total / 3,
          x.grade = x.per <= 35 ? 'fail' : x.per <= 40 ? 'C' : x.per <= 70 ? 'B' : x.per <= 80 ? 'A' : 'A';
        x.isselect = this.isChecked
        if (x.grade == 'fail') {
          x.isselect = true;
        }
        else {
          x.isselect = false;
        }
      });
      let data = this.lstStudentData[index];
      let body = {
        fname: data.fname,
        lname: data.lname,
        mail: data.mail,
        clan: data.clan,
        java: data.java,
        asp: data.asp,
        total: data.total,
        per: data.per,
        grade: data.grade,
        isselect: data.isselect
      };
      this.lstStudentData[index] = body;
      this.updateIndex = -1;
    }
  };

  cancelEdit(index) {
    this.lstStudentData[index] = this.editData;
    this.editData = null;
    this.updateIndex = -1;
  }
  deleteAll() {
    if (this.lstStudentData != 0) {
      if (confirm(" Are you sure you want to delete All Record?")) {
        this.lstStudentData = [];
      }
    }
    else if (this.lstStudentData == 0) {
      alert('No record Found');
    }
  }
  close() {
    this.addRecordModal.hide();
  }

  constructor(private __cS: CommonService, private fb: FormBuilder) { }
  ngOnInit() {
    this.fbStudent(); // validation
    this.lstStudentData = this.__cS.studentData(); // service data
    this.lstStudentData.map(x => {
      x.total = x.java + x.clan + x.asp,
        x.per = x.total / 3,
        x.grade = x.per <= 35 ? 'fail' : x.per <= 40 ? 'C' : x.per <= 70 ? 'B' : x.per <= 80 ? 'A' : 'A',
        x.isselect = this.isChecked
      if (x.grade == 'fail') {
        x.isselect = true;
      }
      else {
        x.isselect = false;
      }
    });

  }
}
