import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Module } from 'src/app/Models/Module';
import {ProfService} from '../../services/prof.service';
import {AuthService} from '../../services/auth.service';
// import { Module } from 'module';

@Component({
  selector: 'app-exam-module-list',
  templateUrl: './exam-module-list.component.html',
  styleUrls: ['./exam-module-list.component.css']
})
export class ExamModuleListComponent implements OnInit {
  currentUser: any;
  constructor(public router: Router, public service: ProfService, private authenticationService: AuthService) {
    this.authenticationService.currentProf.subscribe(x => {
        this.currentUser = x;
        if (this.currentUser == null ) {
          this.router.navigate(['/login/prof']);
        }
      }
    );
    this.authenticationService.SetactivationValue = 'Prof';

  }


   ELEMENT_DATA: any = [/*
    {id: 1, titre: 'Hydrogen',idfiliere: 1,  session: 'H'},
    {id: 2, titre: 'Helium',  idfiliere: 2,  session: 'He'},
    {id: 3, titre: 'Lithium', idfiliere: 3,  session: 'Li'},
    {id: 4, titre: 'Beryllium', idfiliere: 4,session: 'Be'},
    {id: 5, titre: 'Boron',  idfiliere: 5,   session: 'B'},
    {id: 6, titre: 'Carbon',  idfiliere: 6,  session: 'C'},
    {id: 7, titre: 'Nitrogen', idfiliere: 7, session: 'N'},
    {id: 8, titre: 'Oxygen',  idfiliere: 8,  session: 'O'},
    {id: 9, titre: 'Fluorine', idfiliere: 9, session: 'F'},
    {id: 10, titre: 'Neon',   idfiliere: 10, session: 'Ne'},*/
  ];


/*  id: string;
  titre: string;
  idfiliere: number;
  Chargehoraire: number;
  idprof: string;
  anneValidation: string;
  session: string;*/



  displayedColumns: string[] = ['titre', 'Chargehoraire', 'idfiliere', 'session', 'action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  ngOnInit() {
  // this.ELEMENT_DATA =

  this.service.getProfModules().subscribe(data => {this.ELEMENT_DATA = data; this.dataSource = new MatTableDataSource(this.ELEMENT_DATA); });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectModule(element) {
    this.router.navigateByUrl('prof/exam/' + element.id);
  }

}
