import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-guia-cadastro-container',
  templateUrl: './guia-cadastro-container.component.html',
  styleUrls: ['./guia-cadastro-container.component.scss']
})
export class GuiaCadastroContainerComponent implements OnInit {
  screenWidth: number;
  isMobileScreen: boolean = false;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back()
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
    this.isMobileScreen = this.screenWidth < 450;
  }

}
