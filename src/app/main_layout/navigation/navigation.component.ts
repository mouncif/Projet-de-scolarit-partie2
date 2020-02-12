import { Component , OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Etudiant} from '../../Models/Etudiant';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  currentUser: any;
  activation: string;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private authenticationService: AuthService) {
    this.authenticationService.currentEtudiant.subscribe(x => this.currentUser = x);
    this.authenticationService.currentProf.subscribe(x => this.currentUser = x);
    this.authenticationService.activation.subscribe(x => this.activation = x);
  }

  showFiller = false;
  private list;
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.list = [{id : 1, name : 'Accueil', link : '/accueil'}, /*{ id : 2, name : 'Profile', link : '/login'},*/ {id : 3, name : 'Activer mon compte', link : '/activation'}, {id : 4, name : 'A Propos', link : '/aboutus'} ];
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     const currentUser = this.authenticationService.currentEtudiantValue;
     const currentProf = this.authenticationService.currentProfValue;
     const currentAdmin = this.authenticationService.currentAdminsValue;
     const currentOperateur = this.authenticationService.currentOperateurValue;
     if (currentUser || currentProf || currentOperateur || currentAdmin) {
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
     return false;
  }

  onLogout() {
    this.activation = this.authenticationService.activationValue;
    if (this.activation === 'Prof') {
      this.authenticationService.logout('Prof');
      window.location.replace('/login/prof');
      this.router.navigate(['/login/prof']);
    } else if (this.activation === 'Etudiant') {
      this.authenticationService.logout('Etudiant');
      window.location.replace('/login');
      this.router.navigate(['/login']);
    } else if (this.activation === 'Operateur') {
      this.authenticationService.logout('Operateur');
      window.location.replace('/scolarity/login');
      this.router.navigate(['/scolarity/login']);
    } else if (this.activation === 'Admin') {
      this.authenticationService.logout('Admin');
      window.location.replace('/scolarity/admin/login');
      this.router.navigate(['/scolarity/admin/login']);
    }

  }
}
