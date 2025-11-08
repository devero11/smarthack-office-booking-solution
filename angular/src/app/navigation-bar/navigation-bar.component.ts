/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

}
*/

import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements AfterViewInit{
  @Output() tabChange = new EventEmitter<'profile' | 'schedule'>();

  @Input() activeTab: 'profile' | 'schedule' = 'profile';

  ngAfterViewInit(): void {
  }
  selectTab(tab: 'profile' | 'schedule') {
    this.activeTab = tab;
    this.tabChange.emit(tab);
  }
}
