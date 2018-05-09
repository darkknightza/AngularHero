import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  heroes: Hero[] = [];
  // public showDetail: string;
  // public hero: Hero;
  // //public heroes = HEROES;
  // public selectedHero: Hero;
  constructor(private heroService: HeroService) {
   // this.showDetail = 'Hero Number1';
  //this.hero = { id: 1, name:'Baku'};
    
   }
   
  ngOnInit() {
    this.getHeroes();
  }

  // onSelect(hero: Hero) {
  //   //this.selectedHero = hero;
  //   this.route.navigate(['/detail/' + hero.id]);
  // }
  

  getHeroes(): void{
   this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
