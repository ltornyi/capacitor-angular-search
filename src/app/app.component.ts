import { Component, OnDestroy, OnInit } from '@angular/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  ngOnInit() {
    App.addListener('appStateChange', ({isActive}) => {
      if (isActive) {
        console.log('App entered the foreground');
      }
      else {
        console.log('App left the foreground');
      }
    });
  }

  ngOnDestroy() {
    App.removeAllListeners();
  }
}
