import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {FormationService} from '../services/formation.service';
import {Categorie, Contact, Formation} from '../models/Categorie';
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, AfterViewInit {

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  submitted = false;
  send = false;


  contactForm2 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });


  public formations: Array<Formation> = [];
  constructor(private modalService: NgbModal, private toast: ToastrService, private scrool: ScrollToService, private formationService: FormationService, private toastService: ToastrService) { }
  navClass = 'nav-light';
  showNavigationArrows = true;
  showNavigationIndicators = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      }
    },
    nav: false
  };

  ngOnInit(): void {
    this.getFormations();
  }
  /**
   * Open modal for show the video
   * @param content content of modal
   */
  openWindowCustomClass(content): void {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'lg', centered: true });
  }


  getFormations(): void {
    this.formationService.getAllFormations()
        .subscribe((data: Array<Formation>) => {
          this.formations = data.reverse().slice(0, 9);
        }, (error1: HttpErrorResponse) => {
          this.toastService.warning(error1.message, 'Vérifiez votre connection');
        })
  }

  subscribe(): void {
    if (this.contactForm.invalid) {
      this.submitted = true;
      this.toastService.error('Entrez votre adresse email', 'Erreur');
    }else{
      this.send = true;
      const mail: any = this.contactForm.value.email;
      this.formationService.contactNewsLetter(mail).subscribe((c: Contact) => {
        this.toastService.success('Abonnement réussi', 'Succès');
        this.send = false
        this.contactForm.reset();
      }, error1 => {
        this.toastService.error('une erreur s\'est produite, réessayez', 'Erreur');
        this.send = false
      })
    }
  }

  ngAfterViewInit(): void {
    this.scrool.scrollTo({
      target: '#home',
      duration: 10
    });
  }

  submit(): void {

    if (this.contactForm2.invalid) {
      this.submitted = true;
      this.toast.error('Complétez tous les champs', 'Erreur');
    }else{
      this.send = true;
      const name: any = this.contactForm2.value.name;
      const mail: any = this.contactForm2.value.email;
      const msg: any = this.contactForm2.value.message;
      console.log('contact: ', this.contactForm2.value);
      const contact: Contact = {email: mail, formation: null, id: null, message: msg, nom: name}
      this.formationService.contactSimple( contact).subscribe((c: Contact) => {
        this.toast.success('Message envoyé avec succès, nous allons vous repondre par mail sous peu. Merci de nous avoir contacté.', 'Succès');
        this.send = false
        this.contactForm2.reset();
      }, error1 => {
        this.toast.error('une erreur s\'est produite, réessayez', 'Erreur');
        this.send = false
      })
    }
  }

}
