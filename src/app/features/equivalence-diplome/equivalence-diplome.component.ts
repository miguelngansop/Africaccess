import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {FormationService} from '../services/formation.service';
import {ToastrService} from 'ngx-toastr';
import {Candidature, DemandeEquivalence} from '../models/Categorie';

@Component({
  selector: 'app-equivalence-diplome',
  templateUrl: './equivalence-diplome.component.html',
  styleUrls: ['./equivalence-diplome.component.css']
})
export class EquivalenceDiplomeComponent implements OnInit {

  applyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    lettre: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    paysOrigine: new FormControl('', null),
    paysEqivalence: new FormControl('', Validators.required),
  });
  submitted = false;
  send = false;
  constructor(private title: Title, private formationService: FormationService, private formBulder: FormBuilder, private toast: ToastrService) {
    this.title.setTitle('Africaccess | Equivalence de diplôme');
  }

  ngOnInit(): void {
  }



  submit(): void {
    console.log(this.applyForm.value);
    if (this.applyForm.invalid) {
      this.submitted = true;
      this.toast.error('Complétez tous les champs', 'Erreur');
    }else{
      this.send = true;
      const vnom: any = this.applyForm.value.nom;
      const vemail: any = this.applyForm.value.email;
      const vtelephone: any = this.applyForm.value.telephone;
      const vlettre: any = this.applyForm.value.lettre;
      const vpaysOrigine: any = this.applyForm.value.paysOrigine;
      const vpaysEqivalence: any = this.applyForm.value.paysEqivalence;
      const vprenom: any = this.applyForm.value.prenom;
      console.log('Candidatures: ', this.applyForm.value);
      const demandeEquivalence: DemandeEquivalence = {prenom: vprenom, nom: vnom, email: vemail, id: null, lettre: vlettre, telephone: vtelephone, paysEqivalence: vpaysEqivalence, paysOrigine: vpaysOrigine};
      this.formationService.demandeEauivalence( demandeEquivalence ).subscribe((c: Candidature) => {
        this.toast.success('Demande envoyée avec succès.', 'Succès');
        this.send = false;
        this.applyForm.reset();
      }, error1 => {
        this.toast.error('une erreur s\'est produite, réessayez', 'Erreur');
        this.send = false;
      });
    }
  }
}
