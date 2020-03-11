import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private authenticationService: AuthService) { }

  ngOnInit() {
  }

  onProfClick() {
    this.authenticationService.SetactivationValue = 'Prof';
    console.log(this.authenticationService.activationValue);
  }
  onEtudiantClick() {
    this.authenticationService.SetactivationValue = 'Etudiant';
    console.log(this.authenticationService.activationValue);

  }
}
