import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-media',
  templateUrl: './video-media.component.html',
  styleUrls: ['./video-media.component.scss']
})
export class VideoMediaComponent implements OnInit {
  @Input() video_url:string;

  constructor() { }

  ngOnInit(): void {
  }

}
