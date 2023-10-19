import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HEADER_TABS } from './config/header.config';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
  public headerTabs = HEADER_TABS;

  constructor(private router: Router) {}

  ngOnInit() {}
}
