import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

const allowedFileTypes:Array<string> = ['image/jpeg', 'image/gif', 'image/png', 'image/jpg', 'image/jfif'];

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  profile_image:string;

  @Input()
  set image(data: string) {
    this.profile_image = data;
  }

  @Output() imageUpdated: EventEmitter<any> = new EventEmitter();

  selectedFile: ImageSnippet;
  reader: FileReader;

  constructor() { }

  ngOnInit() { }

  processImageChange(imageUpdate: any) {
    const fileSelected = imageUpdate.files[0];
    this.reader = new FileReader();

    this.reader.addEventListener('load', (event) => this.handleImageLoadEvent.call(this, [event, fileSelected]));

    if(allowedFileTypes.indexOf(fileSelected.type) >= 0)
      this.reader.readAsDataURL(fileSelected);
  }

  handleImageLoadEvent(args: any) {
    this.selectedFile = new ImageSnippet(args[0].target.result, args[1]);

    this.imageUpdated.emit({file: this.selectedFile});
  }

  clickImageInput() {
    document.getElementById('file-upload').click();
  }

}
