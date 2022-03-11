import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-alternances',
  templateUrl: './alternances.component.html',
  styleUrls: ['./alternances.component.css']
})
export class AlternancesComponent implements OnInit {

  constructor(private taost: ToastrService) { }

  ngOnInit(): void {
  }

  seeOffers(): void{
    this.taost.info('Nous n\'avons d\'offres en alternance à présent, enregistrez vous à notre newsletter pour ' +
        'recevoir des informations relatives.','Infos')
  }

}
