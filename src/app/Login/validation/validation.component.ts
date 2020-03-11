import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Etudiant} from '../../Models/Etudiant';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {compareVersions} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {Professeur} from '../../Models/Professeur';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {dialogComponent} from './dialog/dialog.component';

export interface DialogData {
  cin: string;
  password: string;
}

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  students: Etudiant[] = [];
  professeurs: Professeur[] = [];
  std: any;
  password: string;
  Et: object;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    public dialog: MatDialog) {
    // redirect to home if already logged in
    if (this.authenticationService.currentEtudiantValue) {
      this.router.navigate(['/']);
    }
    // redirect to home if already logged in
    if (this.authenticationService.currentProfValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      cin: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onLogout() {
    this.authenticationService.logout('Etudiant');
    this.authenticationService.logout('Prof');
    this.authenticationService.logout('Admin');
    this.authenticationService.logout('Operateur');
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      alert('CIN ou Mot de passe incorrect !');
      return;
    }
    this.loading = true;
    if (this.authenticationService.activationValue == 'Etudiant') {
      this.authenticationService.selectEtudiant().subscribe(
        res => {
          if (!res) {
            return;
          }
          console.log(res);
          this.students = [];
          this.students.push((res as any));
          this.students.forEach(obj => {
            this.std = obj;
            // tslint:disable-next-line:forin
            for (const property in obj) {
              this.Et = obj[property];

              console.log(this.Et);
              console.log(this.Et['cin'], '||', this.f.cin.value);
              console.log(this.Et['datenaissance'], '||', this.f.password.value);
              // tslint:disable-next-line:max-line-length
              if (this.Et['cin'] === this.f.cin.value && this.Et['datenaissance'] === this.f.password.value) {
                this.loading = false;
                this.submitted = false;
                // tslint:disable-next-line:triple-equals
                if (this.Et['siValide'] == false || this.Et['siValide'] == null) {
                  this.openDialog();
                  // tslint:disable-next-line:triple-equals
                } else if (this.Et['siValide'] == true) {
                  alert('compte déjà activé !');
                }
                // tslint:disable-next-line:triple-equals
              } else {
                alert("Compte n'existe pas");
                this.loading = false;
                this.submitted = false;
              }
            }
          });
        }
      );
    } else if (this.authenticationService.activationValue == 'Prof') {
      this.authenticationService.selectProf().subscribe(
        res => {
        if (!res) {
          return;
        }
        console.log(res);
        this.professeurs = [];
        this.professeurs.push((res as any));
        this.professeurs.forEach(obj => {
          this.std = obj;
          // tslint:disable-next-line:forin
          for (const property in obj) {
            this.Et = obj[property];

            console.log(this.Et);
            console.log(this.Et['cin'], '||', this.f.cin.value);
            console.log(this.Et['datenaissance'], '||', this.f.password.value);
            // tslint:disable-next-line:max-line-length
            if (this.Et['cin'] === this.f.cin.value && this.Et['datenaissance'] === this.f.password.value) {
              this.loading = false;
              this.submitted = false;
              // tslint:disable-next-line:triple-equals
              if (this.Et['siValide'] == false || this.Et['siValide'] == null) {
                this.openDialog();
                // tslint:disable-next-line:triple-equals
              } else if (this.Et['siValide'] == true) {
                alert('compte déjà activé !');
              }
              // tslint:disable-next-line:triple-equals
            } else {
              // alert("Compte n'existe pas");
              this.loading = false;
              this.submitted = false;
            }
          }
        });
      });

    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(dialogComponent , {
      width: '500px',
      data: {cin: this.Et['prenom']}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.Et['password'] = (result);
      this.Et['siValide'] = true;
      // alert(result);
      if( this.authenticationService.activationValue == 'Prof' ) {
        this.authenticationService.updateProf(this.Et as Professeur).subscribe(() => {
          // alert('done !');
        });
        this.router.navigate(['/accueil']);
      } else if ( this.authenticationService.activationValue == 'Etudiant' ) {
        this.authenticationService.updateEtudiant(this.Et as Etudiant).subscribe(() => {
         // alert('done !');
        });
        this.router.navigate(['/login']);
      }
    });
  }
}
