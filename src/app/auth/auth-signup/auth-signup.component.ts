import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../features/models/User';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../features/services/auth.service';
import {Title} from '@angular/platform-browser';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  registerForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(true, [Validators.required]),
    privacy: new FormControl(true, Validators.required),
    term: new FormControl(false, Validators.required)
  });

  submitted = false;
  send = false;
  ref!: any;
  reallyRef = false;
  success = false;

  constructor(private authService: AuthService, public toast: ToastrService, private router: Router, private title: Title, private activeRoute: ActivatedRoute) {
    title.setTitle('Africaccess | Inscription');

    const ref = activeRoute.snapshot.queryParams.ref;
    if(ref){
      authService.checkExistingEmail(ref).subscribe(
          data => {
            if(data == true) {
              this.ref = ref;
              this.reallyRef = true;
              this.toast.success('Vous avez invitez par ' + ref);
            }else {
              this.toast.warning('La référence passée n\'existe pas', 'Attention');
            }
          }
      ), (error: HttpErrorResponse) => {
        if(error.status == 0) {
          this.toast.warning('Vérifier votre connexion internet. Votre référence ne peut pas être vérifié', 'Attention');
        }
      }
      // authService.getCurrentUserForremote(ref)
      // .subscribe(data => {
      //   if (data !== null) {
      //     this.ref = data.email
      //     this.reallyRef = true;
      //     this.toast.success('Vous avez invitez par '+data.email);
      //   }else {
      //     this.toast.warning('La référence passée n\'existe pas', 'Attention');
      //   }
      // }, (error: HttpErrorResponse) => {
      //   if(error.status == 0) {
      //     this.toast.warning('Vérifier votre connexion internet. Votre référence ne peut pas être vérifié', 'Attention');
      //   }
      // })
    }
  }

  ngOnInit(): void {
  }

  registration(): void{
    this.toast.clear();
    const check = this.registerForm.value.privacy || this.registerForm.value.term;

    if (this.registerForm.invalid){
      this.submitted = true;
      this.toast.error('Complétez tous les champs', 'Erreur');
      if(this.registerForm.value.privacy === false) {
        this.toast.warning('La politique de confidentialité doit être cochée avant la création de votre compte', 'Information');
      }
      if(this.registerForm.value.term === false) {
        this.toast.warning('Les conditions générales d\'utilisation doivent être acceptées avant votre inscription', 'Information')
      }
    }else{
      if(check) {
        this.send = true;
        const user = new User();
        user.name = this.registerForm.value.nom + ' ' + this.registerForm.value.prenom;
        user.email = this.registerForm.value.email;
        user.password = this.registerForm.value.password;
        user.repassword = this.registerForm.value.password;

        if (this.reallyRef) {
          this.authService.signupWithRef(user, this.ref)
              .subscribe(() => {
                this.toast.success('Inscription réussie !', 'Succès');
                this.toast.success('un mail vous a été envoyé, consultez-le afin d\'activer votre compte');
                this.success = true;
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
        } else {
          this.authService.signup(user)
              .subscribe(() => {
                this.toast.success('Inscription réussie !', 'Succès');
                //this.toast.success('un mail vous a été envoyé, consultez-le afin d\'activer votre compte');
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
        }
      }else {
        this.toast.clear();
        this.toast.warning('Les conditions générales et la politique de confidentialité doivent être cochées avant la création de votre compte');
      }

    }
  }
}
