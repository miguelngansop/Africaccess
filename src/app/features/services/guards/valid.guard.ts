import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router, private toast: ToastrService) {
}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAdmin()) {
      this.toast.warning('Non authorisé', 'Attention');
      return this.router.navigate(['/me']);
    }
    return true;
  }
}
