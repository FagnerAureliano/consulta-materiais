import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-guia-cadastro-form',
  templateUrl: './guia-cadastro-form.component.html',
  styleUrls: ['./guia-cadastro-form.component.scss'],
})
export class GuiaCadastroFormComponent implements OnInit {
  text: string;
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
<<<<<<< Updated upstream
    this.form = this.fb.group({
      guiaDocument: [''],
    });
    this.form.get('guiaDocument').valueChanges.subscribe((data) => {
      console.log(data);
    });
=======
    if (this.material) {
      this.onFillForm();
    } else {
      //TEMPORARY
      setTimeout(() => {
        this.onFillForm();
      }, 300);
    }
  }
  onFillForm(): void {
    if (this.material) {
      this.hasDocuments = true;

      const materialScope = this.scopes.find(
        (res) => res.scope === this.material.properties['dc:source']
      );
      this.form.get('nuxeoPathId').setValue(materialScope.id);
      this.form.get('title').setValue(this.material.title);
      this.form.get('content').setValue(this.material.properties['note:note']);
      this.form
        .get('description')
        .setValue(this.material.properties['dc:description']);

      // Devido ao'Tag Input' ser do Shared, utilizando uma lib externa,
      // é necessário enviar a lista da tag para o mesmo e ser tratada por lá.
      this._changedTags = this.material.properties['nxtag:tags'];
    }
>>>>>>> Stashed changes
  }
}
