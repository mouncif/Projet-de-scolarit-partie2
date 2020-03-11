import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthService) { }

  ngOnInit() {
  }

  onAdminClick() {
    this.authenticationService.SetactivationValue = 'Admin';
    console.log(this.authenticationService.activationValue);
  }
  onOperateurClick() {
    this.authenticationService.SetactivationValue = 'Operateur';
    console.log(this.authenticationService.activationValue);

  }
}
