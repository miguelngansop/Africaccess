import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../features/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../features/models/User';

@Component({
  selector: 'app-sign-up-entreprise',
  templateUrl: './sign-up-entreprise.component.html',
  styleUrls: ['./sign-up-entreprise.component.css']
})
export class SignUpEntrepriseComponent implements OnInit {

  registerForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(true, [Validators.required]),
    term: new FormControl(false, Validators.required),
    companySize: new FormControl(null, Validators.required),
    companyAddress: new FormControl(null, Validators.min(3)),
  });

  submitted = false;
  send = false;
  success = false;

  constructor(private authService: AuthService, public toast: ToastrService, private router: Router, private title: Title, private activeRoute: ActivatedRoute) {
    title.setTitle('Africaccess | Inscription');
  }

  ngOnInit(): void {
  }

  registration(): void{
    this.toast.clear();
    const check = this.registerForm.value.privacy || this.registerForm.value.term;

    if (this.registerForm.invalid){
      this.submitted = true;
      this.toast.error('Complétez tous les champs', 'Erreur');
      if (this.registerForm.value.privacy === false) {
        this.toast.warning('La politique de confidentialité doit être cochée avant la création de votre compte', 'Information');
      }
      if (this.registerForm.value.term === false) {
        this.toast.warning('Les conditions générales d\'utilisation doivent être acceptées avant votre inscription', 'Information');
      }
    }else{
      if (check) {
        this.send = true;
        const user = new User();
        user.name = this.registerForm.value.nom ;
        user.email = this.registerForm.value.email;
        user.password = this.registerForm.value.password;
        user.repassword = this.registerForm.value.password;
        user.companyAddress = this.registerForm.value.companyAddress;
        user.companySize = this.registerForm.value.companySize;
        user.isCompagny = true;
        console.log('user: ', user)
        this.authService.signupForCompany(user)
              .subscribe(() => {
                this.toast.success('Inscription réussie !', 'Succès');
                this.success = true;
                this.router.navigateByUrl('/auth-login');
              }, (error: HttpErrorResponse) => {
                this.send = false;
                switch (error.status) {
                  case 500:
                    this.toast.error('Adresse email déjà existante', 'Erreur');
                    break;
                  case 400:
                    this.toast.error('Adresse email déjà existante', 'Erreur');
                    break;
                  case 200:
                    this.toast.success('Inscription réussie !', 'Succès');
                    this.toast.success('un mail vous a été envoyé, consultez-le afin d\'activer votre compte');
                    this.success = true;
                    break;
                  case 202:
                    this.toast.success('Inscription réussie !', 'Succès');
                    this.toast.success('un mail vous a été envoyé, consultez-le afin d\'activer votre compte');
                    this.success = true;
                    break;
                  default:
                    this.toast.error('Impossible de s\'inscrire, Réessayez plutard', 'Erreur');
                    break;
                }
              });

      }else {
        this.toast.clear();
        this.toast.warning('Les conditions générales et la politique de confidentialité doivent être cochées avant la création de votre compte');
      }

    }
  }
}
