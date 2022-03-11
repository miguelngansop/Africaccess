import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Contact} from '../../../features/models/Categorie';
import {FormationService} from '../../../features/services/formation.service';

@Component({
  selector: 'app-page-contact-two',
  templateUrl: './page-contact-two.component.html',
  styleUrls: ['./page-contact-two.component.css']
})
export class PageContactTwoComponent implements OnInit {
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });
  submitted = false;
  send = false;
  constructor(private title: Title, private formationService : FormationService, private formBulder: FormBuilder, private toast: ToastrService) {
    this.title.setTitle('Africaccess | Contact');
  }

  ngOnInit(): void {
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
      this.formationService.contactSimple( contact).subscribe((c: Contact) => {
        this.toast.success('Message envoyé avec succès, nous allons vous repondre par mail sous peu. Merci de nous avoir contacté.', 'Succès');
        this.send = false
        this.contactForm.reset();
      }, error1 => {
        this.toast.error('une erreur s\'est produite, réessayez', 'Erreur');
        this.send = false
      })
    }
  }

}
