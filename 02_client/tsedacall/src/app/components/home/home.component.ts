import { Component, OnInit } from '@angular/core';
import { scrollTo } from '../../shared/helpers/utils';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    scrollTo('app-root');
  }

}
