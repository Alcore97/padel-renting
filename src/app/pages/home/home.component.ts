import { Component } from '@angular/core';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, FooterComponent],
})
export class HomeComponent {
  public homeIMG = '../../../assets/images/inicio2_img';
  ngOnInit(): void {
    console.log(this.homeIMG);
  }
}
