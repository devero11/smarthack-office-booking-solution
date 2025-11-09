/*

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { CommonModule } from '@angular/common';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render user name and role', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(component.user.name);
    expect(compiled.textContent).toContain(component.user.role);
  });

  it('should display events list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const eventRows = compiled.querySelectorAll('.event-row');
    expect(eventRows.length).toBe(component.events.length);
  });

  it('should render correct event structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstEvent = component.events[0];

    const room = compiled.querySelector('.event-room')?.textContent;
    const title = compiled.querySelector('.event-title')?.textContent;
    const dateTime = compiled.querySelector('.event-datetime')?.textContent;
    const type = compiled.querySelector('.event-type')?.textContent;

    expect(room).toContain(firstEvent.roomName);
    expect(title).toContain(firstEvent.title);
    expect(dateTime).toContain(firstEvent.date);
    expect(type?.toLowerCase()).toContain(firstEvent.type);
  });
});


