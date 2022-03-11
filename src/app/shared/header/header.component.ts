import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {User} from '../../features/models/User';
import {SwitcherComponent} from '../switcher/switcher.component';
import {UserStorageService} from '../services/user-storage.service';
import {ToastrService} from 'ngx-toastr';
import {WebService} from '../../features/services/web.service';
import {AuthService} from '../../features/services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() navClass: string;
  auth: any;
  user = new User();
  wait = false;
  isSwitch: boolean = true;
  switcher: SwitcherComponent = new SwitcherComponent();
  isLoadingSwitch: boolean = true
  pro = false;
  isEntreprise: boolean = false;


  constructor(private router: Router, private authService: AuthService, private toast: ToastrService, private uStore: UserStorageService, private webService: WebService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
      }
    });
    const theme:any = localStorage.getItem('theme');

    if(!(localStorage.getItem('theme'))){
      this.setLight();
      this.isSwitch = false
    }else {
      const theme:any = localStorage.getItem('theme');
      if (theme === 'dark') {
        this.setDark();
        this.isSwitch = false
      } else {
        this.setLight();
        this.isSwitch = true

      }
    }
    setTimeout(() => {
      this.isLoadingSwitch = false;
    }, 1000);
  }
  isCondensed = false;


  ngAfterViewInit() {
    this._activateMenuDropdown();
  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()){
      this.auth = true;
      setTimeout(() => {
        this.wait = true;
      }, 1000);
      this.uStore.getUser()
          .subscribe(data => {
            this.user = data;
            this.isEntreprise = this.authService.isEntreprise();
          }, (error : HttpErrorResponse) => {
            if(error.status == 0) {
              this.toast.warning('Vous n\'avez pas de connexion internet', 'Attention');
            }
            if(!error.ok) {
              const u: any = localStorage.getItem('currentUser');
              this.user = JSON.parse(u);
              this.isEntreprise = this.authService.isEntreprise();
            }
          })

    }else{
      this.auth = false;
      setTimeout(() => {
        this.wait = true;
      }, 1000);
    }

  }

  _activateMenuDropdown(): void{
    /**
     * Menu activation reset
     */
    const resetParent = (el) => {
      el.classList.remove('active');
      const parent = el.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.remove('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.remove('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              const parent5 = parent4.parentElement;
              parent5.classList.remove('active');
            }
          }
        }
      }
    };
    let links = document.getElementsByClassName('nav-link-ref');
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset menu
      resetParent(links[i]);
    }
    for (let i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i]['pathname']) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active');
      const parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add('active');
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add('active');
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add('active');
            const parent4 = parent3.parentElement;
            if (parent4) {
              const parent5 = parent4.parentElement;
              parent5.classList.add('active');
            }
          }
        }
      }
    }
  }

  /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById('topnav').classList.add('nav-sticky');
    } else {
      document.getElementById('topnav').classList.remove('nav-sticky');
    }
    if (document.getElementById('back-to-top')) {
      if (document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100) {
        document.getElementById('back-to-top').style.display = 'inline';
      } else {
        document.getElementById('back-to-top').style.display = 'none';
      }
    }
  }


  onChangeThemeMode(event) : void{
    console.log('value: ', event)
    this.switcher.onChangeSwitch()
    if (event === true) {
      const theme:any = localStorage.getItem('theme');
      this.setLight();
      this.isSwitch = true;
    } else {
      this.setDark();
      this.isSwitch = false;
    }
  }

  /**
   * Toggle menu
   */
  toggleMenu(): void {
    this.isCondensed = !this.isCondensed;
    if (this.isCondensed) {
      document.getElementById('navigation').style.display = 'block';
    } else {
      document.getElementById('navigation').style.display = 'none';
    }
  }

  /**
   * Menu clicked show the submenu
   */
  onMenuClick(event) : any{
    event.preventDefault();
    const nextEl = event.target.nextSibling.nextSibling;
    if (nextEl && !nextEl.classList.contains('open')) {
      const parentEl = event.target.parentNode;
      if (parentEl) {
        parentEl.classList.remove('open');
      }
      nextEl.classList.add('open');
    } else if (nextEl) {
      nextEl.classList.remove('open');
    }
    return false;
  };

  /**
   * Set dark theme
   */
  setDark(): void {
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style-dark.css');
    localStorage.setItem('theme', 'dark');
  }

  /**
   * Set light theme
   */
  setLight(): void {
    document.getElementById('theme-opt')?.setAttribute('href', './assets/css/style.css');
    localStorage.setItem('theme', 'light');
  }

  goToLink(link): void{
    this.toggleMenu();
    this.router.navigate([link]);
  }

  logout(): void {
    this.authService.logOut();
    this.toast.success('Déconnexion réussie !', 'Succès');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }
}
