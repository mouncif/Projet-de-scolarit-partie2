import { Component, OnInit } from '@angular/core';
import { Avis } from 'src/app/Models/Avis';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import {ProfService} from '../../services/prof.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-liste-avis',
  templateUrl: './liste-avis.component.html',
  styleUrls: ['./liste-avis.component.css']
})

export class ListeAvisComponent implements OnInit {
  currentUser: any;
  constructor(public router: Router, public dialog: MatDialog, public service: ProfService, public snackBar: MatSnackBar, private authenticationService: AuthService) {
    this.authenticationService.currentProf.subscribe(x => {
        this.currentUser = x;
        if (this.currentUser == null ) {
          this.router.navigate(['/login/prof']);
        }
      }
    );
    this.authenticationService.SetactivationValue = 'Prof';
  }

  MesAvis: any = [/*
    {id: 1, idprof: '1', corp: 'it was sayed that the remaining of the temple is not realy empty', date: '20-12-12', title: 'Anonce 1'},
    {id: 2, idprof: '1', corp: 'it was sayed that the remaining of the temple is not realy empty', date: '20-12-12', title: 'Anonce 2'},
    {id: 3, idprof: '1', corp: 'it was sayed that the remaining of the temple is not realy empty', date: '20-12-12', title: 'Anonce 3'},
    {id: 4, idprof: '1', corp: 'it was sayed that the remaining of the temple is not realy empty', date: '20-12-12', title: 'Anonce 4'}*/];


  displayedColumns: string[] = ['date', 'title', 'corp', 'action'];
  dataSource = this.MesAvis;
  ngOnInit() {
    this.getAvis();
  }

  getAvis() {
     this.service.getMesAvis().subscribe(data => {this.MesAvis = data; this.dataSource = this.MesAvis; });
  }

  delAvis(id) {
   const bar = this.snackBar.open('Voullez vous vraiment Supprimer ?', 'Oui', {
      duration: 2000
    });
   bar.onAction().subscribe(() => {this.service.delAvis(id).subscribe(() => { this.service.getMesAvis().subscribe(data => {this.MesAvis = data; this.dataSource = this.MesAvis; }); }); });

  }

  newAvis() {
    // modal
    const dialogRef = this.dialog.open(ListeAvisDialogComponent  , { width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAvis();
    });
  }




 /* id: number;
  idprof: string;
  corp: string;
  title: string;
  date: string;*/

}

@Component({
  selector: 'app-liste-avis-dialog',
  templateUrl: './app-liste-avis-dialog.html',
  styleUrls: ['./liste-avis.component.css']
})
export class ListeAvisDialogComponent {
 constructor(
    public dialogRef: MatDialogRef<ListeAvisDialogComponent>, public service: ProfService) {}

  addAvis() {
    this.service.addAvis().subscribe(() => {this.dialogRef.close(); });

  }

  closeAvis() {
    this.dialogRef.close();
  }
}


