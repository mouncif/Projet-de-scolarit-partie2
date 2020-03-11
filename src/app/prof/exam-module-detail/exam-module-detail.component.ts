import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/Models/Module';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ProfService} from '../../services/prof.service';
import {AuthService} from '../../services/auth.service';
import {state} from '@angular/animations';

@Component({
  selector: 'app-exam-module-detail',
  templateUrl: './exam-module-detail.component.html',
  styleUrls: ['./exam-module-detail.component.css']
})
export class ExamModuleDetailComponent implements OnInit , CanActivate {
  currentUser: any;
  constructor(public route: ActivatedRoute, public service: ProfService, private authenticationService: AuthService , private router: Router) {
    this.authenticationService.currentProf.subscribe(x => {
      this.currentUser = x;
      if (this.currentUser == null ) {
        this.router.navigate(['/login/prof']);
      }
      }
    );
    this.authenticationService.SetactivationValue = 'Prof';
  }

  ExamData = {
    idModule: '',
    dateExam: '',
    tempDebut: '',
    tempFin: '',
    classes: null
  };

  minDate: Date;
  module: any = {id: null, titre: '', idfiliere: null, Chargehoraire: null, anneValidation: '', idprof: '', session: ''};
  RemainingStudents = 0;
  dispClasse: any = [
   /* {id:1,label:"sale 1",capacite:100},
    {id:4,label:"sale 2",capacite:100},
    {id:2,label:"amphi 1",capacite:100},
    {id:3,label:"amphi 2",capacite:100},
    {id:3,label:"amphi 2",capacite:100},
    {id:3,label:"amphi 2",capacite:100},
  {id:5,label:"labo 1",capacite:100}*/];

  selectedList: any = null;

  // tslint:disable-next-line:no-shadowed-variable
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentProf = this.authenticationService.currentProfValue;
    if (currentProf) {
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login/prof'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.module.id = id;
    this.RemainingStudents = this.getStudentCount();
    this.minDate = new Date();
    this.ExamData.idModule = this.module.id;
    // this.module = this.service.getHero(id);
    this.service.getModule(this.module.id).subscribe(data => {console.log(data); this.module = data;  });
    // this.searchClasses();
  }
  searchClasses() {
    this.service.getDispoClasses().subscribe(data => {this.dispClasse = data; });
    if (this.selectedList != null) {
      this.selectedList.deselectAll();
      this.selectedList.disabled = false;
    }
    this.RemainingStudents = this.getStudentCount();

  }

  getStudentCount() {
    return 500; // this.service.getStudentCountForModule(this.module.id);
  }

  updateSelectClassView(nb) {
    this.selectedList = nb;
    this.RemainingStudents = this.getStudentCount();
    for (const i in nb.selectedOptions.selected) {
      this.RemainingStudents -= this.dispClasse[i].capacite;
      if (this.RemainingStudents <= 0) {
        this.RemainingStudents = 0 ;
        nb.disabled = true;
        this.ExamData.classes = [];
        for (const z in nb.selectedOptions.selected) {
          this.ExamData.classes.push(this.dispClasse[z]);
        }


      }

    }



  }
}
