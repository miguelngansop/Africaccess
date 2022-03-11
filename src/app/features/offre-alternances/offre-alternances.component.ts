import { Component, OnInit, AfterViewInit  } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {FormationService} from '../services/formation.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Alternance, Formation} from '../models/Categorie';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';


@Component({
  selector: 'app-offre-alternances',
  templateUrl: './offre-alternances.component.html',
  styleUrls: ['./offre-alternances.component.css']
})
export class OffreAlternancesComponent implements OnInit, AfterViewInit {
  alternances: Array<Alternance> = [];
  alternancesFilter: Array<Alternance> = [];

  filterForm = new FormGroup({
    selectedNiveau: new FormControl(-1, []),
    selectedLocation: new FormControl(-1, []),
    selectedCategorie: new FormControl(-1, [])
  });

  constructor(private formationService: FormationService, private scrool: ScrollToService, private title: Title, private activatedRoute: ActivatedRoute, private toastService: ToastrService) {
    this.title.setTitle('Offres en alternance | Africaccess');
    this.scrool.scrollTo({
      target: '#home',
      duration: 10
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      }
    },
    nav: false
  };

  ngOnInit(): void {
    this.scrool.scrollTo({
      target: '#home',
      duration: 10
    });
    this.getAlternances();

  }
  getAlternances(): void{
    this.formationService.getAllActivedAlternances()
        .subscribe((list: Array<Alternance>) => {
          this.alternances = list;
          this.alternancesFilter = this.alternances;
        }, (error1: HttpErrorResponse) => {
          this.toastService.warning(error1.message, 'Attention');
        });
  }


  filter(): void{
    console.log('filtre actif: ', this.filterForm.value.selectedCategorie);

    this.alternancesFilter = this.alternances;
    if (this.filterForm.value.selectedCategorie > 0){
      // this.alternancesFilter = this.alternances.filter(x => { return  x.categorie.id == this.filterForm.value.selectedCategorie});
      // console.log('filtre 1: ', this.formationsFilter);
    }
    if (this.filterForm.value.selectedNiveau > 0) {
     // this.formationsFilter = this.formationsFilter.filter(x => x.niveauDeSorti.id == this.filterForm.value.selectedNiveau);
    }
  }

  ngAfterViewInit(): void {
    console.log('scrooling')
    this.scrool.scrollTo({
      target: '#home',
      duration: 10
    });
  }

}


