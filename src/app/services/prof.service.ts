import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exam } from '../Models/Exam';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor(public https:HttpClient,public pipe:DatePipe) { }

  avisForm:FormGroup = new FormGroup({
    id: new FormControl(null),
    idprof: new FormControl('1'),
    corp: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    date: new FormControl(new Date()),
    });

   /* Examform:FormGroup = new FormGroup({
      id: new FormControl(null),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
      city: new FormControl(''),
      gender: new FormControl('1'),
      department: new FormControl(0),
      hireDate: new FormControl(''),
      isPermanent: new FormControl(false)
      });*/

  url="http://localhost:3000";
  getProfModules()
  {
   return this.https.get(this.url+"/module");
  }
  getModule(id)
  {
    return this.https.get(this.url+"/module/"+id);
  }

  getDispoClasses()
  {
    return this.https.get(this.url+"/classe");
  }

  addExam(Exam:Exam,listeclasses)
  {
    return this.https.post(this.url+"/exam",Exam)/*.subscribe(()=>{

      /*for(i in  listeclasses)
      {
        this.https.post(this.url+"/PasserExam")
      }
    })*/;
    
  }
  addAvis()
  {
    console.log(this.avisForm.value);
    this.avisForm.setValue({id:null,idprof:1,title:this.avisForm.get("title").value,corp:this.avisForm.get("corp").value,date:this.pipe.transform(new Date(),"yyyy/MM/dd")});
    console.log(this.avisForm.value);
    return this.https.post(this.url+"/avis",this.avisForm.value);
  }

  clearformavis(){
    this.avisForm.setValue({corp:"",title:new Date()});
  }
  getExams()
  {
    return this.https.get(this.url+"/exam");
  }

  getMesAvis()
  {
    return this.https.get(this.url+"/avis");
  }

  delAvis(id)
  {
    return this.https.delete(this.url+"/avis/"+id);
  }
}
