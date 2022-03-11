import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-nos-services',
  templateUrl: './nos-services.component.html',
  styleUrls: ['./nos-services.component.css']
})
export class NosServicesComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Africaccess | Nos services');
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
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
  }

}
