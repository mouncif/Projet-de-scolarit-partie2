import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Etudiant} from '../../Models/Etudiant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  students: Etudiant[] = [];
  Et: object;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
  ) {
     // redirect to home if already logged in
     if (this.authenticationService.currentEtudiantValue) {
       this.router.navigate(['/']);
     }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      alert('Apogee ou mot de passe incorrect !');
      return;
    }


    this.loading = true;
    /*this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(() => {
      alert('connected');
*/

    this.authenticationService.selectEtudiant().subscribe(
      res => {
        if (!res) {return; }
        console.log(res);
        this.students = [];
        this.students.push((res as any));
        this.students.forEach( obj => {
          // tslint:disable-next-line:forin
          for (const property in obj) {
            this.Et = obj[property];
            console.log(this.Et['apogee'] , '||' , this.f.username.value);
            console.log(this.Et['password'] , '||' , this.f.password.value);
            // tslint:disable-next-line:max-line-length radix
            if (this.Et['apogee'] === parseInt(this.f.username.value) && this.Et['password'] === this.f.password.value) {
              this.authenticationService.loginE(this.Et);
              this.loading = false;
              this.submitted = false;
              this.router.navigate(['/']);
            } else {
              alert('not yet!!');
              this.loading = false;
              this.submitted = false;
            }
          }
        });
      }
    );
  }

  onLogout() {
    this.authenticationService.logout('Prof');
    this.router.navigate(['/login']);
  }
}

