import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
	sliderConfig = {
		spaceBetween :10,
		centeredSlides:true,
		slidesPerView:1.6
	}
  constructor() { }
}
