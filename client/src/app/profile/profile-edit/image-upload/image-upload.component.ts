import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

const allowedFileTypes:Array<string> = [
  'image/jpeg', 
  'image/gif', 
  'image/png', 
  'image/jpg', 
  'image/jfif'
];

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  profile_image:string;

  // Input decorator that allows parent component to pass us our profile image
  @Input()
  set image(data: string) {
    this.profile_image = data;
  }

  // Output decorator to update parent component when user selects a valid image
  @Output() imageUpdated: EventEmitter<any> = new EventEmitter();

  selectedFile: ImageSnippet;
  reader: FileReader;

  constructor() { }

  ngOnInit() { }

  // process file input change
  processImageChange(imageUpdate: any) {
    // imageUpdate is the event triggered by the file type input, and we grab the first file
    const fileSelected = imageUpdate.files[0];

    // Create and assign a new FileReader 
    this.reader = new FileReader();

    // add the load listener to our file reader
    this.reader.addEventListener('load', (event) => this.handleImageLoadEvent.call(this, [event, fileSelected]));

    // if the selected file's type is in our allowedFileType list then trigger a read by the file reader
    if(allowedFileTypes.indexOf(fileSelected.type) >= 0)
      this.reader.readAsDataURL(fileSelected);
  }

  // handle the image after it has been loaded by the file reader
  handleImageLoadEvent(args: any) {
    // create a new ImageSnippet class that will hold the src and file data
    this.selectedFile = new ImageSnippet(args[0].target.result, args[1]);

    // emit the imageUpdated event to our parent component
    this.imageUpdated.emit({file: this.selectedFile});
  }

  // trigger the click event on our hidden file-upload input element
  clickImageInput() {
    document.getElementById('file-upload').click();
  }

}
