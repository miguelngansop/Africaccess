import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Africaccess | Présentation');

  }

  ngOnInit(): void {
  }

}
