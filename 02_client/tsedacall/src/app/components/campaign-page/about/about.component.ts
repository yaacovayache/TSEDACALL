import { Component, OnInit, Input } from '@angular/core';
import { Campaign } from 'src/app/shared/models/campaign.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @Input() campaign:Campaign;

  constructor() { }

  ngOnInit(): void {
  }

}
