import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgxMasonryModule } from 'ngx-masonry';
import { ScrollspyDirective } from './shared/scrollspy.directive';

import { AccountMembersComponent } from './core/components/account-members/account-members.component';
import { AccountMessagesComponent } from './core/components/account-messages/account-messages.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AccountPaymentsComponent } from './core/components/account-payments/account-payments.component';
import { AccountProfileComponent } from './core/components/account-profile/account-profile.component';
import { AccountSettingComponent } from './core/components/account-setting/account-setting.component';
import { AccountWorksComponent } from './core/components/account-works/account-works.component';
import { AuthCoverLoginComponent } from './auth/auth-cover-login/auth-cover-login.component';
import { AuthCoverRePasswordComponent } from './auth/auth-cover-re-password/auth-cover-re-password.component';
import { AuthCoverSignupComponent } from './auth/auth-cover-signup/auth-cover-signup.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { AuthLoginThreeComponent } from './auth/auth-login-three/auth-login-three.component';
import { AuthRePasswordComponent } from './auth/auth-re-password/auth-re-password.component';
import { AuthRePasswordThreeComponent } from './auth/auth-re-password-three/auth-re-password-three.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { AuthSignupThreeComponent } from './auth/auth-signup-three/auth-signup-three.component';
import { IndexComponent } from './core/components/index/index.component';
import { IndexServicesComponent } from './core/components/index-services/index-services.component';
import { PageAboutusComponent } from './core/components/page-aboutus/page-aboutus.component';
import { PageAboutusTwoComponent } from './core/components/page-aboutus-two/page-aboutus-two.component';
import { PageCaseDetailComponent } from './core/components/page-case-detail/page-case-detail.component';
import { PageComingsoonComponent } from './core/components/page-comingsoon/page-comingsoon.component';
import { PageComingsoon2Component } from './core/components/page-comingsoon2/page-comingsoon2.component';
import { PageContactDetailComponent } from './core/components/page-contact-detail/page-contact-detail.component';
import { PageContactOneComponent } from './core/components/page-contact-one/page-contact-one.component';
import { PageContactThreeComponent } from './core/components/page-contact-three/page-contact-three.component';
import { PageContactTwoComponent } from './core/components/page-contact-two/page-contact-two.component';
import { PageJobApplyComponent } from './core/components/page-job-apply/page-job-apply.component';
import { PageJobCandidateComponent } from './core/components/page-job-candidate/page-job-candidate.component';
import { PageJobCompanyComponent } from './core/components/page-job-company/page-job-company.component';
import { PageJobDetailComponent } from './core/components/page-job-detail/page-job-detail.component';
import { PageJobsComponent } from './core/components/page-jobs/page-jobs.component';
import { PageJobsSidebarComponent } from './core/components/page-jobs-sidebar/page-jobs-sidebar.component';
import { PageMaintenanceComponent } from './core/components/page-maintenance/page-maintenance.component';
import { PagePricingComponent } from './core/components/page-pricing/page-pricing.component';
import { PagePrivacyComponent } from './core/components/page-privacy/page-privacy.component';
import { PageTeamComponent } from './core/components/page-team/page-team.component';
import { PageTermsComponent } from './core/components/page-terms/page-terms.component';
import { WidgetComponent } from './core/components/widget/widget.component';
import { FeatherModule } from 'angular-feather';

import { allIcons } from 'angular-feather/icons';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SwitcherComponent } from './shared/switcher/switcher.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailFormationComponent } from './features/detail-formation/detail-formation.component';
import { FormationsComponent } from './features/formations/formations.component';
import { AccueilComponent } from './features/accueil/accueil.component';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { PresentationComponent } from './features/presentation/presentation.component';
import { NosServicesComponent } from './features/nos-services/nos-services.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AlternancesComponent } from './features/alternances/alternances.component';
import { OffreAlternancesComponent } from './features/offre-alternances/offre-alternances.component';
import { AlternanceDetailsComponent } from './features/alternance-details/alternance-details.component';
import { PostulerComponent } from './features/postuler/postuler.component';
import { MonProfilComponent } from './features/mon-profil/mon-profil.component';
import { EquivalenceDiplomeComponent } from './features/equivalence-diplome/equivalence-diplome.component';
import { SignUpEntrepriseComponent } from './auth/sign-up-entreprise/sign-up-entreprise.component';
import {MasterPageComponent} from './core/components/master-page/master-page.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccountMembersComponent,
    AccountMessagesComponent,
    LoginComponent,
    RegistrationComponent,
    AccountPaymentsComponent,
    AccountProfileComponent,
    AccountSettingComponent,
    AccountWorksComponent,
    AuthCoverLoginComponent,
    AuthCoverRePasswordComponent,
    AuthCoverSignupComponent,
    AuthLoginComponent,
    AuthLoginThreeComponent,
    AuthRePasswordComponent,
    AuthRePasswordThreeComponent,
    AuthSignupComponent,
    AuthSignupThreeComponent,
    IndexComponent,
    IndexServicesComponent,
    PageAboutusComponent,
    PageAboutusTwoComponent,
    PageCaseDetailComponent,
    PageComingsoonComponent,
    PageComingsoon2Component,
    PageContactDetailComponent,
    PageContactOneComponent,
    PageContactThreeComponent,
    PageContactTwoComponent,
    PageJobApplyComponent,
    PageJobCandidateComponent,
    PageJobCompanyComponent,
    PageJobDetailComponent,
    PageJobsComponent,
    PageJobsSidebarComponent,
    PageMaintenanceComponent,
    PagePricingComponent,
    PagePrivacyComponent,
    PageTeamComponent,
    PageTermsComponent,
    WidgetComponent,
    SwitcherComponent,
    ScrollspyDirective,
    DetailFormationComponent,
    FormationsComponent,
    AccueilComponent,
    PresentationComponent,
    NosServicesComponent,
    ResetPasswordComponent,
    AlternancesComponent,
    OffreAlternancesComponent,
    AlternanceDetailsComponent,
    PostulerComponent,
    MonProfilComponent,
    EquivalenceDiplomeComponent,
    SignUpEntrepriseComponent,
    MasterPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    CarouselModule,
    FeatherModule.pick(allIcons),
    ScrollToModule.forRoot(),
    RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
    NgxYoutubePlayerModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    SwiperModule,
    NgxTypedJsModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgxMasonryModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
  ],
  exports: [
    FeatherModule,
    ScrollspyDirective
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
