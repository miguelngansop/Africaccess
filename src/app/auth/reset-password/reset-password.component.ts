import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../features/services/auth.service';
import {Title} from '@angular/platform-browser';
import {HttpErrorResponse} from '@angular/common/http';
import {ResetPassword} from '../../features/models/User';
import {passwordConfirmValidator} from '../../shared/passwordConfirm';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  sent = false;
  token!: string;

  resetPassWdForm!: FormGroup;
  resetDetails = new ResetPassword();

  constructor(private fb: FormBuilder, private toast: ToastrService, public authService: AuthService,
              private router: Router, private activatedRoute: ActivatedRoute, private title: Title, ) {
    title.setTitle('Africaccess | Récupération du mot de passe');
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params.token;
    this.initForm();
    this.authService.resetPasswordGuard(this.token).subscribe((result: any) => {
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.toast.error('Le lien a expiré ou est incorrect, recommencez le processus!', 'Erreur');
        this.router.navigateByUrl('/auth-re-password');
      }
    });

  }

  initForm(): void {
    this.resetPassWdForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, passwordConfirmValidator]],
    });

    this.resetPassWdForm.controls.password.valueChanges.subscribe(
        X => this.resetPassWdForm.controls.confirmPassword.updateValueAndValidity()
    );
  }

  /*initForm(): void {
    this.resetPassWdForm = this.fb.group({
      password: [this.resetDetails.password, [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
    this.resetPassWdForm.controls.password.valueChanges.subscribe(
      X => this.resetPassWdForm.controls.confirmPassword.updateValueAndValidity()
      );
  }*/

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password')!.value;
    const confirmPasswd = group.get('confirmPassword')!.value;

    return password === confirmPasswd ? null : { notSame: true };
  }

  onSubmit(): void {
    this.sent = true;
    const resetPwd = this.resetPassWdForm.value.password;

    if (this.resetPassWdForm.valid) {
      this.authService.resetPassword(resetPwd, this.token).subscribe((data) =>
          {
            // this.toast.success("Modification reussie")
          },
          (error: HttpErrorResponse) => {
            if (error.status === 200){
              this.toast.success('Mot de passe réinitialisé avec succès', 'Succès');
              this.router.navigateByUrl('/auth-login');
            }else if (error.status === 401) {
              this.toast.warning('Le lien a expiré', 'Attention');
              this.sent = false;
            }else {
              this.toast.error('Une erreur vient de se produire, reesayez plus tard', 'Erreur');
              this.sent = false;
            }
          });
    } else {
      this.toast.error('Mot de passe invalide');
    }

  }



}
