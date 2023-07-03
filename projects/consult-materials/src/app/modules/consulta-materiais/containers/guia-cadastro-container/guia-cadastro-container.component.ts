import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';

@Component({
  selector: 'app-guia-cadastro-container',
  templateUrl: './guia-cadastro-container.component.html',
  styleUrls: ['./guia-cadastro-container.component.scss'],
})
export class GuiaCadastroContainerComponent implements OnInit {
  screenWidth: number;
  isMobileScreen: boolean = false;
  _form: FormGroup;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private consultaService: ConsultaMateriaisService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._form = this.fb.group({
      guiaForm: this.fb.group({}),
    });
  }
  goBack(): void {
    this.location.back();
  }
  ngAfterContentChecked(): void {
    // if (!this.isEdit) {
    this._form.markAllAsTouched();
    this.cdref.detectChanges();
    // }
  }
  handleSave(): void {
    const formData = new FormData();
    formData.append('file', this._form?.get('guiaForm').value.guiaDocument);
    const data = {
      guia: this._form?.get('guiaForm').value.guiaDocument,
    };
    // const { title, description, tags } = {
    //   title: 'description',
    //   description: 'description',
    //   tags: 'description',
    // };

    // formData.append(
    //   'data',
    //   JSON.stringify({
    //     title,
    //     description,
    //     tags,
    //   })
    // );

    // this.consultaService.createDocument(formData).subscribe(() => {
    //   this.goBack();
    // });

    console.log(data);
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
    this.isMobileScreen = this.screenWidth < 450;
  }
}
