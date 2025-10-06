
import { Component, inject, signal, OnInit, HostListener, ElementRef } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [RouterModule,],
})
export default class NavbarComponent implements OnInit {
 

  constructor(
  ) {
  }

 
  ngOnInit(): void {

  }
}