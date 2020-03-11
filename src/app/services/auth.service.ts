import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Etudiant} from '../Models/Etudiant';
import {BehaviorSubject, Observable, observable} from 'rxjs';
import {Professeur} from '../Models/Professeur';
import {Operateur} from '../Models/Operateur';
import {Administrateur} from '../Models/Administrateur';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Et: Etudiant;
  etRep: Etudiant;
  // Etudiant Vars
  private currentEtudiantSubject: BehaviorSubject<Etudiant>;
  public currentEtudiant: Observable<Etudiant>;
  // Profs Vars
  private currentProfSubject: BehaviorSubject<Professeur>;
  public currentProf: Observable<Professeur>;
  // Compte Active
  private activations: BehaviorSubject<string>;
  public activation: Observable<string>;
  // Operateur vars
  private currentOperateurSubject: BehaviorSubject<Operateur>;
  public currentOperateur: Observable<Operateur>;
  // admins vars
  private currentAdminSubject: BehaviorSubject<Administrateur>;
  public currentAdmin: Observable<Administrateur>;
  // nav data
  private navbardataSubject: BehaviorSubject<any>;
  public navbardata: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentEtudiantSubject = new BehaviorSubject<Etudiant>(JSON.parse(localStorage.getItem('currentEtudiant')));
    this.currentEtudiant = this.currentEtudiantSubject.asObservable();

    this.currentProfSubject = new BehaviorSubject<Professeur>(JSON.parse(localStorage.getItem('currentProf')));
    this.currentProf = this.currentProfSubject.asObservable();

    this.currentOperateurSubject = new BehaviorSubject<Operateur>(JSON.parse(localStorage.getItem('currentOperateur')));
    this.currentOperateur = this.currentOperateurSubject.asObservable();

    this.currentAdminSubject = new BehaviorSubject<Administrateur>(JSON.parse(localStorage.getItem('currentAdmin')));
    this.currentAdmin = this.currentAdminSubject.asObservable();

    this.activations = new BehaviorSubject<string>(null);
    this.activation = this.activations.asObservable();


    this.currentProf.subscribe(x => {
        if (x == null ) {
          this.navbardataSubject = new BehaviorSubject<any>( [{id : 1, name : 'Accueil', link : '/accueil'}, {id : 3, name : 'Activer mon compte', link : '/activation'}, {id : 4, name : 'A Propos', link : '/aboutus'} ]);
          this.navbardata = this.navbardataSubject.asObservable();
        } else {
          this.navbardataSubject = new BehaviorSubject<any>( [{id : 1, name : 'Accueil', link : '/accueil'}, {id : 3, name : 'Mes Avis', link : '/prof/avis'}, {id : 4, name : 'Modules', link : '/prof/exam'}, {id : 6, name : 'A propos', link : '/aboutus'}] );
          this.navbardata = this.navbardataSubject.asObservable();
        }
      }
    );
  }

  public get currentEtudiantValue(): Etudiant {
    return this.currentEtudiantSubject.value;
  }
  public get currentProfValue(): Professeur {
    return this.currentProfSubject.value;
  }
  public get currentOperateurValue(): Operateur {
    return this.currentOperateurSubject.value;
  }
  public get currentAdminsValue(): Administrateur {
    return this.currentAdminSubject.value;
  }

  public get activationValue(): string {
    return this.activations.value;
  }
  public set SetactivationValue(valu) {
    this.activations = new BehaviorSubject<string>(valu);
    this.activation = this.activations.asObservable();
  }
  public set setCurrentOperateurValue(val) {
    this.currentOperateurSubject = new BehaviorSubject<Operateur>(val);
    this.currentOperateur = this.currentOperateurSubject.asObservable();
  }

  public get getnavbardata(): any {
    return this.navbardataSubject.value;
  }

  public set setnavbardata(data) {
    this.navbardataSubject = new BehaviorSubject<any>( data );
    this.navbardata = this.navbardataSubject.asObservable();
  }
  private etudiantUrl = 'http://localhost:3000/Etudiant';
  private profUrl = 'http://localhost:3000/Professeur';
  private AdminUrl = 'http://localhost:3000/Admin';
  private OperateurUrl = 'http://localhost:3000/Operateur';

  loginE(user) {
    localStorage.setItem('currentEtudiant', JSON.stringify(user));
    this.currentEtudiantSubject.next(user);
  }
  loginP(user) {
    localStorage.setItem('currentProf', JSON.stringify(user));
    this.currentEtudiantSubject.next(user);
  }
  loginOp(user) {
    localStorage.setItem('currentOperateur', JSON.stringify(user));
    this.currentEtudiantSubject.next(user);
  }
  loginAdmins(user) {
    localStorage.setItem('currentAdmin', JSON.stringify(user));
    this.currentEtudiantSubject.next(user);
  }

  logout(user) {
    // remove user from local storage to log user out
    localStorage.removeItem('current' + user);
  }

  selectEtudiant() {
    return this.http.get(this.etudiantUrl);
  }
  updateEtudiant(user) {
    return this.http.put(`${this.etudiantUrl}/${user.id}`, user);
  }
  selectProf() {
    return this.http.get(this.profUrl);
  }
  updateProf(user) {
    return this.http.put(`${this.profUrl}/${user.id}`, user);
  }
  selectOperateur() {
    return this.http.get(this.OperateurUrl);
  }
  updateOperateur(user) {
    return this.http.put(`${this.OperateurUrl}/${user.id}`, user);
  }
  selectAdmin() {
    return this.http.get(this.AdminUrl);
  }
  updateAdmin(user) {
    return this.http.put(`${this.AdminUrl}/${user.id}`, user);
  }
}
