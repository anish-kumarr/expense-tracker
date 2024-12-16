import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


enum UploadState {
  Pending = 'Pending',
  Uploading = 'Uploading',
  Completed = 'Completed',
  Error = 'Error'
}

interface FileUpload {
  // file: File | null,
  fileName: string,
  filePreview: string | ArrayBuffer | null,
  isDragging: boolean
}


@Component({
  selector: 'app-upload',
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  isDragging: boolean = false;
  file: File | null = null;
  previewData: string | ArrayBuffer | null = null;
  fileName: string = "";
  uploadState: UploadState = UploadState.Pending;
  fileUpload: FileUpload = this.getInitialFileUpload();

  constructor() {

  }

  ngOnInit(): void {
  }

  private getInitialFileUpload(): FileUpload {
    return {
      fileName: '',
      filePreview: null,
      isDragging: false
    };
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.fileUpload.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    if(event.screenX === 0 && event.screenY === 0) {
      this.fileUpload.isDragging = false;
    }
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    
    this.uploadState = UploadState.Uploading;
    this.fileUpload.isDragging = false;
    if(event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event): void {
    this.uploadState = UploadState.Uploading;
    this.fileUpload.isDragging = false;

    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if(files && files.length > 0) {
      this.handleFile(files[0])
    }
  }

  handleFile(file: File): void {
    
    const validExt = ['image/jpeg', 'image/png', 'application/pdf'];
    if(validExt.includes(file.type)) {
      const reader =  new FileReader();
      reader.onload = () => {
        this.fileUpload.filePreview = reader.result;
        this.fileUpload.fileName = file.name;
        }

        reader.readAsDataURL(file);
        console.log(this.fileUpload.filePreview);
        this.uploadState = UploadState.Completed;
      } else {
        this.uploadState = UploadState.Error;
      }
  }

  onSubmit() {

  }

  onClear(): void {
    this.fileUpload = this.getInitialFileUpload();
    this.uploadState = UploadState.Pending;
  }
}
