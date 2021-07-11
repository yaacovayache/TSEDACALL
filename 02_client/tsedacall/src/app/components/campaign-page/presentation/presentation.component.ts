import { Component, OnInit, Input } from '@angular/core';
import { Campaign } from 'src/app/shared/models/campaign.model';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  @Input() campaign:Campaign;

  constructor() { }

  ngOnInit(): void {
  }

}
