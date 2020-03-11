import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Professeur} from '../../Models/Professeur';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-prof',
  templateUrl: './login-prof.component.html',
  styleUrls: ['./login-prof.component.css']
})
export class LoginProfComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  Prof: Professeur[] = [];
  Et: object;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService) {
    this.authenticationService.SetactivationValue = 'Prof';

    // redirect to home if already logged in
    if (this.authenticationService.currentProfValue) {
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

  onLogout() {
    this.authenticationService.logout('Etudiant');
    this.router.navigate(['/login']);
  }

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

    this.authenticationService.selectProf().subscribe(
      res => {
        if (!res) {return; }
        console.log(res);
        this.Prof = [];
        this.Prof.push((res as any));
        this.Prof.forEach( obj => {
          // tslint:disable-next-line:forin
          for (const property in obj) {
            this.Et = obj[property];
            console.log(this.Et['cin'] , '||' , this.f.username.value);
            console.log(this.Et['password'] , '||' , this.f.password.value);
            // tslint:disable-next-line:max-line-length
            if (this.Et['cin'] === this.f.username.value && this.Et['password'] === this.f.password.value) {
              this.authenticationService.loginP(this.Et);
              this.loading = false;
              this.submitted = false;
              this.authenticationService.setnavbardata = [{id : 1, name : 'Accueil', link : '/accueil'}, {id : 3, name : 'Avis', link : '/prof/avis'}, {id : 4, name : 'Modules', link : '/prof/exam'}, {id : 6, name : 'A propos', link : '/a propos'}];
              this.router.navigate(['/']);
              window.location.replace('/');
            } else {
              // alert('not yet!!');
              this.loading = false;
              this.submitted = false;
            }
          }
        });
      }
    );
  }

}
