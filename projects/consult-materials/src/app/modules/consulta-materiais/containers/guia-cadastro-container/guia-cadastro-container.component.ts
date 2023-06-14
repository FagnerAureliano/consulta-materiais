import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guia-cadastro-container',
  templateUrl: './guia-cadastro-container.component.html',
  styleUrls: ['./guia-cadastro-container.component.scss']
})
export class GuiaCadastroContainerComponent implements OnInit {
 
  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back()
  }

}
