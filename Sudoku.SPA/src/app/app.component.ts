import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sudoku.SPA';
  @ViewChild("content", { static: true })
    content!: ElementRef;
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  level!:string|null
  ngOnInit() {
    this.open()
  }


  open() {
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.modalService.open(this.content, { centered: true });
  }

  openNew() {
    if (this.level != null) {
      this.step1 = false;
      this.step3 = true;
      this.step2 = false;
      this.modalService.open(this.content, { centered: true });
    }
    else {
      this.open() 
    }
  }
 

  next(step: number) {
    switch(step)
    {
      case 1:
        this.step1 = false;
        this.step3 = false;
        this.step2 = true;
        break;

      case 2:
        this.step1 = true;
        this.step2 = false;
        this.step3 = false;
        break;

      case 3:
        this.step1 = true;
        this.step3 = false;
        this.step2 = false;
        break;
    }

  }

  selectLevel(level:string): void {
    this.level = level;
    this.modalService.dismissAll();
  }

  close() {
    this.modalService.dismissAll();
  }
}
