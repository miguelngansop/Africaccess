import { Component, OnInit } from '@angular/core';
import {Alternance, Formation} from '../models/Categorie';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {FormationService} from '../services/formation.service';

@Component({
  selector: 'app-alternance-details',
  templateUrl: './alternance-details.component.html',
  styleUrls: ['./alternance-details.component.css']
})
export class AlternanceDetailsComponent implements OnInit {
  alternance: Alternance ;
  alternanceID: number;
  categories: Array<Alternance> = [];
  relatedAlternance: Array<Formation> = [];
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });
  submitted = false;
  send = false;
  constructor( private router: Router , private formBulder: FormBuilder, private toast: ToastrService, public activeRoute: ActivatedRoute, private title: Title, private formationService: FormationService ) {
    this.title.setTitle('Africaccess | details formation');
    this.alternanceID = this.activeRoute.snapshot.params.id;
    this.formationService.geAlternanceById(this.alternanceID).subscribe((alternance: Alternance) => {
      this.alternance = alternance;
    }, error1 => {
      this.toast.warning('Impossible de charger l\'offre! ', 'Erreur');
      console.log('erreur: ', error1);
    });
  }

  ngOnInit(): void {
  }

}
