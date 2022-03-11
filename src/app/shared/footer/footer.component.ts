import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormationService} from "../../features/services/formation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../../features/models/Categorie";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  submitted = false;
  send = false;
  constructor(private toastService: ToastrService, private formationService: FormationService) { }

  ngOnInit(): void {
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

}
