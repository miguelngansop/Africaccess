import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class InnerGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router, private toast: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.toast.info('Connectez-vous s\'il vous plait !', 'Message');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
