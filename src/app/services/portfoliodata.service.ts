import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {

  constructor() { }

  skills = [
    { icon: 'assets/img/angular.png', name: 'Angular' },
    { icon: 'assets/img/typescript.png', name: 'TypeScript' },
    { icon: 'assets/img/javascript.png', name: 'JavaScript' },
    { icon: 'assets/img/html.png', name: 'HTML' },
    { icon: 'assets/img/css.png', name: 'CSS' },
    { icon: 'assets/img/firebase.png', name: 'Firebase' },
    { icon: 'assets/img/git.png', name: 'Git' },
    { icon: 'assets/img/scrum.png', name: 'Scrum' },
    { icon: 'assets/img/api.png', name: 'Rest-Api' },
    { icon: 'assets/img/material_design.png', name: 'Material Design' },
  ];


  projects = [
    {
      id: 0,
      img: 'assets/img/join.png',
      title: 'Join',
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      languages: 'JavaScript | HTML | CSS | Firebase',
      projecturl: '',
      githuburl: 'https://github.com/OnurCopur/Join'
    },
    {
      id: 1,
      img: 'assets/img/elpolloloco.png',
      title: 'El Pollo Loco',
      description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen',
      languages: 'JavaScript | HTML | CSS',
      projecturl: '',
      githuburl: 'https://github.com/OnurCopur/El-Pollo-Loco',
    },

    {
      id: 2,
      img: 'assets/img/pokedex.png',
      title: 'Pokédex',
      description: 'Based on the PokéAPI a simple library that provides and catalogues pokemon information.',
      languages: 'JavaScript | HTML | CSS | API',
      projecturl: '',
      githuburl: '',
    }
  ];
}
