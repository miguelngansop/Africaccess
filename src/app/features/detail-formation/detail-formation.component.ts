import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Categorie, Contact, Formation} from '../models/Categorie';
import {FormationService} from '../services/formation.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ScrollToService} from "@nicky-lenaers/ngx-scroll-to";

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})
export class DetailFormationComponent implements OnInit, AfterViewInit {
  formation: Formation ;
  formationID: number;
  categories: Array<Categorie> = [];
  relatedFormations: Array<Formation> = [];
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    pays: new FormControl('', Validators.required),
    ville: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required)
  });
  submitted = false;
  send = false;
  constructor( private router: Router , private scrool: ScrollToService, private formBulder: FormBuilder, private toast: ToastrService, public activeRoute: ActivatedRoute, private title: Title, private formationService: FormationService ) {
    this.initial(null);
  }

  ngOnInit(): void {
    this.getAllCategorie();
  }


  getAllCategorie(): void {
    this.formationService.getAllCategories().subscribe((categories: Array<Categorie>) => {
      this.categories = categories;
    })
  }

  getFormationsRelated(): void {
    this.formationService.getFormationOfCategorieID(this.formation.categorie.id)
        .subscribe((list: Array<Formation>) => {
          this.relatedFormations = list.filter((item: Formation) => { return item.id !== this.formation.id});
          this.toast.info(' Il existe ( ' + list.length + ' ) ' + 'formtions similaires', 'Information')
        }, error1 => {
          console.log('error: ', error1);
        })
  }

  submit(): void {

    if (this.contactForm.invalid) {
      this.submitted = true;
      this.toast.error('Complétez tous les champs', 'Erreur');
    }else{
      this.send = true;
      const name: any = this.contactForm.value.name;
      const mail: any = this.contactForm.value.email;
      const msg: any = this.contactForm.value.message;
      console.log('contact: ', this.contactForm.value);
      const contact: Contact = {email: mail, formation: null, id: null, message: msg, nom: name}
      this.formationService.contact(this.formationID, contact).subscribe((c: Contact) => {
        this.toast.success('Message envoyé avec succès, nous allons vous repondre par mail sous peu. Merci de nous avoir contacté.', 'Succès');
        this.send = false
        this.contactForm.reset();
        }, error1 => {
        this.toast.error('une erreur s\'est produite, réessayez', 'Erreur');
        this.send = false
      })
  }
  }

  initial(id: number ): void {
    this.title.setTitle('Africaccess | details formation');
    if ( id != null ){     this.router.navigate(['formations' , id , 'details']);
                           window.location.reload();
    }
    this.formationID = this.activeRoute.snapshot.params.id;
    this.formationService.getFormationById(this.formationID).subscribe((formation: Formation) => {
      this.formation = formation;
      this.getFormationsRelated();
      this.scrool.scrollTo({
        target: '#home',
        duration: 10
      });
    }, error1 => {
      this.toast.warning('Impossible de charger la fornmation ', 'Erreur');
      console.log('erreur: ', error1);
    });

  }

  ngAfterViewInit(): void {
    this.scrool.scrollTo({
      target: '#home',
      duration: 10
    });
  }
}
