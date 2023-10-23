import { Component } from '@angular/core';
import { BottomNavbarComponent } from '@app/components/bottom-navbar/bottom-navbar.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [BottomNavbarComponent],
})
export class HomeComponent {
  public homeIMG = '../../../assets/images/inicio.png';
  ngOnInit(): void {}
}
