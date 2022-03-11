import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {hostBase} from '../../../environments/hostBase';
import {Alternance, Candidature, Contact} from "../models/Categorie";

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  baseUrl = hostBase.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(this.baseUrl + 'categories/getAll');
  }
  getAllFormations(): Observable<any> {
    return this.http.get(this.baseUrl + 'formations/all');
  }
  getAllAlternances(): Observable<any> {
    return this.http.get(this.baseUrl + 'candidatures/getAllOffresAlternances');
  }
  getAllActivedAlternances(): Observable<any> {
    return this.http.get(this.baseUrl + 'candidatures/getAllActivedOffresAlternances');
  }
  getFormationById(id: number) : Observable<any> {
    return this.http.get(this.baseUrl + 'formations/getById/' + id);
  }
  getFormationOfCategorieID(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'formations/categorie/' + id);
  }
  contact(formationID: number, contact: Contact): Observable<any> {
    return this.http.post(this.baseUrl + 'formations/contact/' + formationID, contact);
  }
  contactSimple(contact: Contact): Observable<any> {
    return this.http.post(this.baseUrl + 'formations/contact', contact);
  }
  contactNewsLetter(email: string): Observable<any> {
    return this.http.post(this.baseUrl + 'formations/contact/newsletter', email);
  }
  getAllNiveaux(): Observable<any> {
    return this.http.get(this.baseUrl + 'niveauDeSorti/list');
  }
  candidater(candidature: Candidature): Observable<any> {
    return this.http.post(this.baseUrl + 'candidatures/apply', candidature);
  }
  addOffreAlternance(alternance: Alternance, userid: number): Observable<any> {
    return this.http.post(this.baseUrl + 'candidatures/addAlternance/' + userid, alternance );
  }

  demandeEauivalence(demande: any): Observable<any> {
    return this.http.post(this.baseUrl + 'candidatures/apply', demande);
  }
  geAlternanceById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'candidatures/getAllOffreByID/' + id)
  }

}
