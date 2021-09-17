import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public flags = [
    {country: 'France', countryCode: 'fr', class:'flag-icon flag-icon-fr flag-icon-squared'},
    {country: 'United-Kingdom', countryCode: 'en', class:'flag-icon flag-icon-gb flag-icon-squared'},
    {country: 'Israel', countryCode: 'he', class:'flag-icon flag-icon-il flag-icon-squared'}
  ]
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }



}
