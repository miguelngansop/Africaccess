import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCoverLoginComponent } from './auth/auth-cover-login/auth-cover-login.component';
import { AuthCoverRePasswordComponent } from './auth/auth-cover-re-password/auth-cover-re-password.component';
import { AuthCoverSignupComponent } from './auth/auth-cover-signup/auth-cover-signup.component';
import { AuthLoginThreeComponent } from './auth/auth-login-three/auth-login-three.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { AuthRePasswordThreeComponent } from './auth/auth-re-password-three/auth-re-password-three.component';
import { AuthRePasswordComponent } from './auth/auth-re-password/auth-re-password.component';
import { AuthSignupThreeComponent } from './auth/auth-signup-three/auth-signup-three.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';

import { AccountMembersComponent } from './core/components/account-members/account-members.component';
import { AccountMessagesComponent } from './core/components/account-messages/account-messages.component';
import { AccountPaymentsComponent } from './core/components/account-payments/account-payments.component';
import { AccountProfileComponent } from './core/components/account-profile/account-profile.component';
import { AccountSettingComponent } from './core/components/account-setting/account-setting.component';
import { AccountWorksComponent } from './core/components/account-works/account-works.component';
import { IndexServicesComponent } from './core/components/index-services/index-services.component';
import { IndexComponent } from './core/components/index/index.component';
import { PageAboutusTwoComponent } from './core/components/page-aboutus-two/page-aboutus-two.component';
import { PageAboutusComponent } from './core/components/page-aboutus/page-aboutus.component';
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
import { PageJobsSidebarComponent } from './core/components/page-jobs-sidebar/page-jobs-sidebar.component';
import { PageJobsComponent } from './core/components/page-jobs/page-jobs.component';
import { PageMaintenanceComponent } from './core/components/page-maintenance/page-maintenance.component';
import { PagePricingComponent } from './core/components/page-pricing/page-pricing.component';
import { PagePrivacyComponent } from './core/components/page-privacy/page-privacy.component';
import { PageTeamComponent } from './core/components/page-team/page-team.component';
import { PageTermsComponent } from './core/components/page-terms/page-terms.component';
import { WidgetComponent } from './core/components/widget/widget.component';
import { SwitcherComponent } from './shared/switcher/switcher.component';
import {FormationsComponent} from './features/formations/formations.component';
import {DetailFormationComponent} from './features/detail-formation/detail-formation.component';
import {AccueilComponent} from './features/accueil/accueil.component';
import {PresentationComponent} from './features/presentation/presentation.component';
import {NosServicesComponent} from './features/nos-services/nos-services.component';
import {GuardGuard} from './features/services/guards/guard.guard';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {AlternancesComponent} from './features/alternances/alternances.component';
import {OffreAlternancesComponent} from './features/offre-alternances/offre-alternances.component';
import {AlternanceDetailsComponent} from './features/alternance-details/alternance-details.component';
import {PostulerComponent} from './features/postuler/postuler.component';
import {MonProfilComponent} from './features/mon-profil/mon-profil.component';
import {InnerGuard} from './features/services/guards/inner.guard';
import {EquivalenceDiplomeComponent} from './features/equivalence-diplome/equivalence-diplome.component';
import {SignUpEntrepriseComponent} from './auth/sign-up-entreprise/sign-up-entreprise.component';
import {MasterPageComponent} from './core/components/master-page/master-page.component';
const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      { path: '', component: AccueilComponent },
      { path: 'accueil', component: AccueilComponent },
      { path: 'offres-en-alternance', component: OffreAlternancesComponent },
      { path: 'equivalence-de-diplome', component: EquivalenceDiplomeComponent },
      { path: 'postuler', component: PostulerComponent },
      { path: 'espace-personnel', component: MonProfilComponent, canActivate: [InnerGuard] },
      { path: 'alternances/:id/details', component: AlternanceDetailsComponent },
      { path: 'presentation', component: PresentationComponent }, { path: 'services', component: NosServicesComponent }, { path: 'account-messages', component: AccountMessagesComponent },
      { path: 'account-members', component: AccountMembersComponent },
      { path: 'account-payments', component: AccountPaymentsComponent },
      { path: 'account-profile', component: AccountProfileComponent },
      { path: 'account-setting', component: AccountSettingComponent },
      { path: 'account-works', component: AccountWorksComponent },
      { path: 'index', component: IndexComponent },
      { path: 'index-services', component: IndexServicesComponent },
      { path: 'page-aboutus', component: PageAboutusComponent },
      { path: 'apropos', component: PageAboutusTwoComponent },
      { path: 'page-case-detail', component: PageCaseDetailComponent },
      { path: 'page-contact-detail', component: PageContactDetailComponent },
      { path: 'page-contact-one', component: PageContactOneComponent },
      { path: 'page-contact-three', component: PageContactThreeComponent },
      { path: 'contact', component: PageContactTwoComponent },
      { path: 'page-job-apply', component: PageJobApplyComponent },
      { path: 'page-job-candidate', component: PageJobCandidateComponent },
      { path: 'page-job-company', component: PageJobCompanyComponent },
      { path: 'page-job-detail', component: PageJobDetailComponent },
      { path: 'page-jobs', component: PageJobsComponent },
      { path: 'page-jobs-sidebar', component: PageJobsSidebarComponent },
      { path: 'tarifs', component: PagePricingComponent },
      { path: 'page-privacy', component: PagePrivacyComponent },
      { path: 'page-team', component: PageTeamComponent },
      { path: 'page-terms', component: PageTermsComponent },
      { path: 'widget', component: WidgetComponent },
      { path: 'formations/:id/details', component: DetailFormationComponent },
      { path: 'formations/:id', component: FormationsComponent },
      { path: 'formations', component: FormationsComponent },
      { path: 'contrats-alternance', component: AlternancesComponent },



      { path: '#', component: SwitcherComponent },
    ]
  },
  {
    path: 'reset-password/:token',
    canActivate: [GuardGuard],
    component: ResetPasswordComponent
  },
  { path: 'auth-login', component: AuthLoginComponent, canActivate: [GuardGuard] },
  { path: 'auth-cover-login', component: AuthCoverLoginComponent },
  { path: 'auth-cover-re-password', component: AuthCoverRePasswordComponent },
  { path: 'auth-cover-signup', component: AuthCoverSignupComponent },
  { path: 'auth-login-three', component: AuthLoginThreeComponent },
  { path: 'auth-re-password', component: AuthRePasswordComponent },
  { path: 'auth-re-password-three', component: AuthRePasswordThreeComponent },
  { path: 'auth-signup', component: AuthSignupComponent, canActivate: [GuardGuard] },
  { path: 'creer-un-compte-entreprise', component: SignUpEntrepriseComponent, canActivate: [GuardGuard] },
  { path: 'auth-signup-three', component: AuthSignupThreeComponent },
  { path: 'page-comingsoon', component: PageComingsoonComponent },
  { path: 'page-comingsoon2', component: PageComingsoon2Component },
  { path: 'page-maintenance', component: PageMaintenanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
