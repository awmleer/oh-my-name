import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  animating = false;
  namePrevious = '名字';
  nameCurrent = '名字';

  characters = '';

  constructor(
    private http: HttpClient
  ){}

  async ngOnInit(){
    this.characters = await this.http.get('./assets/characters/safe.txt', {
      responseType: 'text'
    }).toPromise();
  }

  nextName(){
    if (this.animating) {
      return;
    }
    this.namePrevious = this.generateName();
    this.animating = true;
    setTimeout(() => {
      this.animating = false;
      [this.nameCurrent, this.namePrevious] = [this.namePrevious, this.nameCurrent];
    }, 500);
  }

  generateName():string{
    const x = Math.floor(Math.random()*this.characters.length);
    const y = Math.floor(Math.random()*this.characters.length);
    return this.characters[x] + this.characters[y];
  }

}
