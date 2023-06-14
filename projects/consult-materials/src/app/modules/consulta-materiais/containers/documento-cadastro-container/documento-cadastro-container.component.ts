import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documento-cadastro-container',
  templateUrl: './documento-cadastro-container.component.html',
  styleUrls: ['./documento-cadastro-container.component.scss'],
})
export class DocumentoCadastroContainerComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}
  goBack(): void {
    this.location.back();
  }
}
