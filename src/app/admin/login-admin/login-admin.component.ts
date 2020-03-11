import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Administrateur} from '../../Models/Administrateur';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  Admins: Administrateur[] = [];
  Et: object;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentAdminsValue) {
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

    this.authenticationService.selectAdmin().subscribe(
      res => {
        if (!res) {return; }
        console.log(res);
        this.Admins = [];
        this.Admins.push((res as any));
        this.Admins.forEach( obj => {
          // tslint:disable-next-line:forin
          for (const property in obj) {
            this.Et = obj[property];
            console.log(this.Et['cin'] , '||' , this.f.username.value);
            console.log(this.Et['password'] , '||' , this.f.password.value);
            // tslint:disable-next-line:max-line-length
            if (this.Et['cin'] === this.f.username.value && this.Et['password'] === this.f.password.value) {
              this.authenticationService.loginAdmins(this.Et);
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
