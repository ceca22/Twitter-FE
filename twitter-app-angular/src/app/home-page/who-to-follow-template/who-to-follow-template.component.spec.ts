import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoToFollowTemplateComponent } from './who-to-follow-template.component';

describe('WhoToFollowTemplateComponent', () => {
  let component: WhoToFollowTemplateComponent;
  let fixture: ComponentFixture<WhoToFollowTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoToFollowTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoToFollowTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
