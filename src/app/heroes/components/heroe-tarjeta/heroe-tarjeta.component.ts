import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
  mat-card {
    margin-top: 20px
  }
  img{
    height: 300px;
  }
`]
})
export class HeroeTarjetaComponent{

  @Input() heroe!: Heroe;

}
