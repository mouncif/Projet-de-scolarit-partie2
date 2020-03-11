import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Etudiant} from '../../Models/Etudiant';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Operateur} from '../../Models/Operateur';

@Component({
  selector: 'app-login-operateur',
  templateUrl: './login-operateur.component.html',
  styleUrls: ['./login-operateur.component.css']
})
export class LoginOperateurComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  Operateur: Operateur[] = [];
  Et: object;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentOperateurValue) {
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

    this.authenticationService.selectOperateur().subscribe(
      res => {
        if (!res) {return; }
        console.log(res);
        this.Operateur = [];
        this.Operateur.push((res as any));
        this.Operateur.forEach( obj => {
          // tslint:disable-next-line:forin
          for (const property in obj) {
            this.Et = obj[property];
            console.log(this.Et['cin'] , '||' , this.f.username.value);
            console.log(this.Et['password'] , '||' , this.f.password.value);
            // tslint:disable-next-line:max-line-length
            if (this.Et['cin'] === this.f.username.value && this.Et['password'] === this.f.password.value) {
              this.authenticationService.loginOp(this.Et);
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
}
