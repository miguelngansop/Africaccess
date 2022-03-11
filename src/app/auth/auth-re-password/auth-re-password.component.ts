import { Component, OnInit } from '@angular/core';
import {ResetPassword} from '../../features/models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../features/services/auth.service';
import {Title} from '@angular/platform-browser';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-auth-re-password',
  templateUrl: './auth-re-password.component.html',
  styleUrls: ['./auth-re-password.component.css']
})
export class AuthRePasswordComponent implements OnInit {

  recoverForm!: FormGroup;

  submitted = false;
  send = false;

  resetDetails = new ResetPassword();
  pb = true;


  constructor(private fb: FormBuilder, private toast: ToastrService, private title: Title,
              private activatedRoute: ActivatedRoute, public authService: AuthService, private router: Router) {
    title.setTitle('Go Africa | Récupération du mot de passe');
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.recoverForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  recover(): void{
    this.submitted = true;

    const email = this.recoverForm.get('email')?.value;
    if (this.recoverForm.invalid){
      this.toast.error('Compléter tous les champs', 'Erreur');
    }else{
      this.send = true;
      this.authService.forgotPassword(email).subscribe((data)=>{
            // console.log("Email sent successfully");
            this.toast.success('Un mail a été envoyé à votre adresse', '');
            // this.send = false;
          },
          (error: HttpErrorResponse) => {
            console.log('Erreur http', error);

            if (error.status === 200) {
              this.toast.success('Un mail a été envoyé à l\'adresse '+email, 'Envoie de mail');
              this.send = false
              this.pb = false
              // this.router.navigateByUrl('/');
            }else if(error.status === 404){
              this.toast.error('Adresse email introuvable ', 'Erreur');
              this.send = false;
            }else{
              this.toast.error('Une erreur est survenue, veuillez reessayer ultelieurement', 'Erreur');
              this.send = false;
            }
            this.send = false;
          });
    }
  }
}
