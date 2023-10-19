import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent],
})
export class HomeComponent {}
