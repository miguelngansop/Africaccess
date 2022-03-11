import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {UserStorageService} from '../../shared/services/user-storage.service';
import {WebService} from '../../features/services/web.service';
import {AuthService} from '../../features/services/auth.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {BasicUser} from '../../features/models/BasicUser';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  send = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  submitted = false;
  constructor(private webService: WebService , private toast: ToastrService, public authService: AuthService, private router: Router, private title: Title, private uStore: UserStorageService) { title.setTitle('Africaccess | Connexion'); }

  ngOnInit(): void {
  }


  login(): void {

    if (this.loginForm.invalid) {
      this.submitted = true;
      this.toast.error('Complétez tous les champs', 'Erreur');
    }else{
      this.send = true;
      const username: any = this.loginForm.value.email;
      const password: any = this.loginForm.value.password;
      this.authService.login(username, password).subscribe
      ((result: any) => {
        const token = result.headers.get('authorization');
        this.authService.saveToken(token);
        this.authService.getCurrentUserForremote(this.loginForm.value.email).subscribe((p: any) => {
          let u = new BasicUser();
          u.name = p.name;
          u.email = p.email;
          u.profilePicture = p.profilePicture;
          u.tel = p.tel;

          localStorage.setItem('currentUser', JSON.stringify(u));
          this.uStore.setUser(p);

          this.toast.success('Connexion réussie', 'Succès');
          this.toast.clear();
          this.toast.info('redirection...', 'Veillez patientez');
          this.router.navigateByUrl('/');
          window.location.reload();
        });
      }, (error: HttpErrorResponse) => {
        this.send = false;
        let msg = '';
        switch (error.status) {
          case 403:
            msg = 'Email ou mot de passe incorrect';
            break;
          default:
            msg = 'Impossible de se connecter, Veuilez réessayer ultérieurement';
            break;
        }
        this.toast.error(msg, 'Erreur');
      });
    }
  }
}
