import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  // pure: true
})
export class ImagenPipe implements PipeTransform {

  transform( heroe: Heroe ): string {

    if( !heroe.id && !heroe.url ) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1200px-Imagen_no_disponible.svg.png';
    } else if ( heroe.url ) {
      return heroe.url;
    } else {
      //return `assets/heroes/${ heroe.id }.jpg`;
      return heroe.url!;
    }


  }

}
