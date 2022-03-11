import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormationService} from '../services/formation.service';
import {Categorie, Formation, NiveauDeSorti} from '../models/Categorie';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ScrollToService} from "@nicky-lenaers/ngx-scroll-to";

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit, AfterViewInit {
  navClass = 'nav-light';
  filterredImages;
  domaines: Array<string> = [];
  galleryFilter = 'all';
  typeID: string ;
  selectedCategorie: number = null;
  selectedNiveau: number = null;
  selectedType: string = null;
  formations: Array<Formation> = [];
  formationsFilter: Array<Formation> = [];
  niveaux: Array<NiveauDeSorti> = [];
  public categories: Array<Categorie> = [];
  caseList = [];
  filterForm = new FormGroup({
    selectedNiveau: new FormControl(-1, []),
    selectedType: new FormControl(-1, []),
    selectedCategorie: new FormControl(-1, [])
  });
  typesDeFormation = [{value: 'Diplômes', viewValue: 'Diplômes - Formations longues'}, {value: 'Certificats', viewValue: 'Certificats - Formations courtes'}]
  constructor(public activeRoute: ActivatedRoute, private formationService: FormationService, private scrool: ScrollToService, private title: Title, private activatedRoute: ActivatedRoute, private toastService: ToastrService) {
    this.typeID = this.activeRoute.snapshot.params.id;
    console.log('type: ', this.typeID)
  }

  ngOnInit(): void {
    this.title.setTitle('Africaccess | Toutes nos formations');
    this.getFormations();
    this.getCategories();
    this.getNiveaux();
    this.filterredImages = this.caseList;

  }
  activeCategory(category): void {
    this.galleryFilter = category;
    if (this.galleryFilter === 'all') {
      this.formationsFilter = this.formations;
    } else {
      this.formationsFilter = this.formations.filter(x => { if (x.categorie.libelle === this.galleryFilter) { this.filterForm.patchValue({selectedCategorie: x.categorie.id}); } return x.categorie.libelle === this.galleryFilter; });
    }
    this.scrool.scrollTo({
      target: '#list',
      duration: 10
    });
  }

  filter(): void{
    console.log('filtre actif: ', this.filterForm.value.selectedCategorie)

    this.formationsFilter = this.formations;
    if (this.filterForm.value.selectedCategorie > 0){
      this.formationsFilter = this.formations.filter(x => { return  x.categorie.id == this.filterForm.value.selectedCategorie});
      console.log('filtre 1: ', this.formationsFilter);
    }
    if (this.filterForm.value.selectedNiveau > 0) {
      this.formationsFilter = this.formationsFilter.filter(x => x.niveauDeSorti.id == this.filterForm.value.selectedNiveau);
    }

    this.scrool.scrollTo({
      target: '#list',
      duration: 10
    });
  }

  getFormations(): void{
    this.formationService.getAllFormations()
        .subscribe((list: Array<Formation>) => {
          this.formations = list
          this.formationsFilter = this.formations;
        }, (error1: HttpErrorResponse) => {
          this.toastService.warning(error1.message, 'Attention');
        });
  }

  getCategories(): void {
    this.domaines = []
    this.formationService.getAllCategories()
        .subscribe((data: Array<Categorie>) => {
          this.categories = data;
          this.domaines = data.map(item => {return item.libelle});
        }, (error1: HttpErrorResponse) => {
          this.toastService.warning(error1.message, 'Attention');
        })
  }

  getNiveaux(): void {
    this.niveaux = []
    this.formationService.getAllNiveaux()
        .subscribe((data: Array<NiveauDeSorti>) => {
          this.niveaux = data;
        }, (error1: HttpErrorResponse) => {
          this.toastService.warning(error1.message, 'Attention');
        });
  }

  ngAfterViewInit(): void {
    this.scrool.scrollTo({
      target: '#home',
      duration: 10
    });
  }

}

