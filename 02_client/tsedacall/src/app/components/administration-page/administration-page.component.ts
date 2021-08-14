import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss']
})
export class AdministrationPageComponent implements OnInit {
  public currentAssociation;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.currentAssociation = this.authService.getLocalStorageUser()
  }

}
