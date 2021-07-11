import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-or-search',
  templateUrl: './create-or-search.component.html',
  styleUrls: ['./create-or-search.component.scss']
})
export class CreateOrSearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onNavigation(){
    this.router.navigate(['/associations']);
  }
}
