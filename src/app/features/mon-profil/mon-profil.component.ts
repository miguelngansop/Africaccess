import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {UserStorageService} from "../../shared/services/user-storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../models/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {Alternance, Candidature} from "../models/Categorie";
import {FormationService} from "../services/formation.service";

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})
export class MonProfilComponent implements OnInit {

  applyForm = new FormGroup({
    intitule: new FormControl('', Validators.required),
    niveauQualification: new FormControl('', Validators.required),
    positionAlternant: new FormControl('', Validators.required),
    lieuDeTravail: new FormControl('', Validators.required),
    remuneration: new FormControl('', ),
    coordonneeCandidatures: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    competences: new  FormControl('', Validators.required)
  });
  submitted = false;
  send = false;


  navClass = 'nav-light';
  user: User = new  User();
  auth: boolean = false;
  wait: boolean = false;
  constructor(private authService: AuthService, private userStorageService: UserStorageService, private formationService: FormationService, private title: Title, private toast: ToastrService, private uStore: UserStorageService, private formBulder: FormBuilder) { }

  ngOnInit(): void {
this.title.setTitle('Espace entreprise | Africaccess');
    if (this.authService.isAuthenticated()){
      this.auth = true;
      setTimeout(() => {
        this.wait = true;
      }, 1000);
      this.uStore.getUser()
          .subscribe(data => {
            this.user = data;
          }, (error : HttpErrorResponse) => {
            if(error.status == 0) {
              this.toast.warning('Vous n\'avez pas de connexion internet', 'Attention');
            }
            if(!error.ok) {
              const u: any = localStorage.getItem('currentUser');
              this.user = JSON.parse(u);
            }
          })
    }else{
      this.auth = false;
      setTimeout(() => {
        this.wait = true;
      }, 1000);
    }

  }


  submit(): void {
    console.log(this.applyForm.value);
    if (this.applyForm.invalid) {
      this.submitted = true;
      this.toast.warning('Complétez tous les champs', 'Erreur');
    }else{
      this.send = true;
      const vintitule: any = this.applyForm.value.intitule;
      const vniveauQualification: any = this.applyForm.value.niveauQualification;
      const vpositionAlternant: any = this.applyForm.value.positionAlternant;
      const vlieuDeTravail: any = this.applyForm.value.lieuDeTravail;
      const vremuneration: any = this.applyForm.value.remuneration;
      const vcoordonneeCandidatures: any = this.applyForm.value.coordonneeCandidatures;
      const vdescription: any = this.applyForm.value.description;
      const vcompetences: any = this.applyForm.value.competences;
      console.log('offre: ', this.applyForm.value);
      const offreAlternance: Alternance = {intitule: vintitule, niveauQualification: vniveauQualification, id: null, competences: vcompetences, coordonneeCandidatures: vcoordonneeCandidatures, description: vdescription, lieuDeTravail: vlieuDeTravail, positionAlternant: vpositionAlternant, remuneration: vremuneration};
      const u: any = localStorage.getItem('currentUser');
      this.user = JSON.parse(u);
      this.authService.getCurrentUserForremote(this.user.email).subscribe((u: any) => {
        this.formationService.addOffreAlternance( offreAlternance, u?.id).subscribe((c: Alternance) => {
          this.toast.success('Offre publiée avec succès, vous serez notifié après vérification de l\'administrateur!.', 'Succès');
          this.send = false;
          this.applyForm.reset();
        }, error1 => {
          this.toast.error('une erreur s\'est produite, réessayez', 'Erreur');
          this.send = false;
        });
      }, error => {
        this.toast.error('une erreur s\'est produite, réessayez', 'Erreur');

      })

    }
  }


}
