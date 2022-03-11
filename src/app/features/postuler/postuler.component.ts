import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {FormationService} from '../services/formation.service';
import {ToastrService} from 'ngx-toastr';
import {Candidature, Contact} from '../models/Categorie';

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.css']
})
export class PostulerComponent implements OnInit {
  applyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nom: new FormControl('', Validators.required),
    lettre: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    intitule: new FormControl('', Validators.required),
    cvURL: new  FormControl('', Validators.required)
  });
  submitted = false;
  send = false;
  constructor(private title: Title, private formationService: FormationService, private formBulder: FormBuilder, private toast: ToastrService) {
    this.title.setTitle('Africaccess | Postuler');
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
      const vintitule: any = this.applyForm.value.intitule;
      console.log('Candidatures: ', this.applyForm.value);
      const candidature: Candidature = {nom: vnom, email: vemail, id: null, lettre: vlettre, telephone: vtelephone, cvURL: null, intitule: vintitule};
      this.formationService.candidater( candidature).subscribe((c: Candidature) => {
        this.toast.success('Candidature envoyée avec succès.', 'Succès');
        this.send = false;
        this.applyForm.reset();
      }, error1 => {
        this.toast.error('une erreur s\'est produite, réessayez', 'Erreur');
        this.send = false;
      });
    }
  }
}
