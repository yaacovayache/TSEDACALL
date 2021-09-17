import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modify-details',
  templateUrl: './modify-details.component.html',
  styleUrls: ['./modify-details.component.scss']
})
export class ModifyDetailsComponent implements OnInit {
  @Input() campaign:Campaign;
  @Input() medias:string[];
  @Input() more:boolean;

  domain = environment.apiUrl
  pattern_url = environment.apiUrl + 'media/'
  pattern_cover = environment.apiUrl + 'cover/'
  newPhoto;
  bad_video:boolean=false;

  constructor(private campaignService:CampaignService, private router: Router) { }

  ngOnInit(): void {
  }

  onClickAddPicture(){
    Swal.fire({
      title: 'Add photo',
      input: 'file',
      icon: 'info',
      confirmButtonText: 'Add'
    }).then((result) => {
      if (result.value) {
        this.newPhoto = <File>result.value;
        let fd = new FormData();
        fd.append('media', this.newPhoto, this.newPhoto.name);
        this.campaignService.addMedia(fd, this.campaign._id).subscribe((res)=>{
          this.campaignService.getCampaignMediaName(this.campaign._id).subscribe((res)=>{
            this.medias = res.media
            if (this.medias.length > 3) this.more = true;
          })
        })
      }
    })
  }

  onDelete(id, name){
    this.campaignService.deleteMedia(name, id).subscribe((res:any)=>{
      if (!res.error){
        this.campaignService.getCampaignMediaName(this.campaign._id).subscribe((res)=>{
          this.medias = res.media
          if (this.medias.length > 3) this.more = true;
        })
        Swal.fire('Deleted !', 'Photo deleted', 'success')
      } else {
        Swal.fire('Error', 'An error occured', 'error')
      }

    })
  }

  onChange(value, key, id){
    if (key =='video' && !value.includes('embed')){
      this.bad_video=true
      return
    } else if (key =='video' && value.includes('embed')) {
      this.bad_video=false
    }
    let data = {}
    data[key] = value
    this.campaignService.updateCampaign(data, id).subscribe((res:any)=>{
      if (!res.error){
        Swal.fire('Updated !', 'Field updated', 'success')
      } else {
        Swal.fire('Error', 'An error occured', 'error')
      } 
    })
  }

  onChangeCover(event, id) {
    if (event.target.value){
      this.newPhoto = <File>event.target.files[0];
      let fd = new FormData();
      fd.append('cover', this.newPhoto, this.newPhoto.name);
      this.campaignService.updateCover(fd, id).subscribe((res) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/administration/modif']);
        }); 
      })
    }
  }

}
