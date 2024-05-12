import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  public slide_content:any=[
    {id:1 ,img:'../../assets/R (2) 1.png', title:'Let’s Get Some Real Socializing!',sub_title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit leo felis congue elit leo.'},
    {id:2 ,img:'../../assets/R (3) 1.png', title:'See The Activities Inside Your Social Range.',sub_title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit leo felis congue elit leo.'},
  ]

  constructor( public route :Router ) { }

  ngOnInit() {
  }
  
  
}
