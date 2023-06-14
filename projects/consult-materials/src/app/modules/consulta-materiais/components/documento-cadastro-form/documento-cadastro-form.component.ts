import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-documento-cadastro-form',
  templateUrl: './documento-cadastro-form.component.html',
  styleUrls: ['./documento-cadastro-form.component.scss']
})
export class DocumentoCadastroFormComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      descricao: [null],
    });
    // this.form.get('descricao').valueChanges.subscribe((data) => {
    //   console.log(data);
    // });
  }

@ViewChild('fileUpload') fileUpload: FileUpload; 
onShowUpload(event) {
  console.log(event.target);
  
  for (let file of event.files) {
    this.form.patchValue({ descricao: file });
    this.form.get('descricao').updateValueAndValidity();
  }
  
        
    }

    save(){
      this.fileUpload.upload();
      console.log(this.form.value )
    }

}
