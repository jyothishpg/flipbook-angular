import { Component,Inject, ElementRef, HostListener, OnInit, inject, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Book, FlipbookService, PageType } from '@labsforge/flipbook';
import screenfull from 'screenfull';


import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {

  get demoBook() {
    return this.flipService.book;
  }

  startAt = 0;
  currentPage = 1;
  elem: any;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private elr: ElementRef,
    private flipService: FlipbookService
  ) {
  }

  ngOnInit() {
    this.flipService.book = {
      width: 1100,
      height: 740,
      zoom: 1,
      cover: {
        front: {
          imageUrl: 'assets/demo/02-right.png',
        },
        back: {
          imageUrl: 'assets/demo/02-left.png',
        }
      },
      pages: [
        { // start guard section
          imageUrl: 'assets/demo/guard.jpg',
          backgroundColor: '#41473A', // don't use if want to see front-cover inverted image
        },
        {
          imageUrl: 'assets/demo/guard.jpg',
        }, // end guard section
        { // start transparent-sheet section
          imageUrl: 'assets/demo/blank.jpg',
        },
        {
          imageUrl: 'assets/demo/01-left.png',
          opacity: 0.6,
        },
        {
          imageUrl: 'assets/demo/blank.jpg',
          opacity: 0.4,
        },
        {
          imageUrl: 'assets/demo/blank.jpg',
        }, // end transparent-sheet section
        {
          imageUrl: 'assets/demo/03-left.png',
        },
        {
          imageUrl: 'assets/demo/03-right.png',
        },
        {
          imageUrl: 'assets/demo/04-left.png',
        },
        {
          imageUrl: 'assets/demo/04-right.png',
        },
        {
          imageUrl: 'assets/demo/05-left.png',
        },
        {
          imageUrl: 'assets/demo/05-right.png',
        },
        {
          imageUrl: 'assets/demo/06-left.png',
        },
        {
          imageUrl: 'assets/demo/06-right.png',
        },
        { // start guard section
          imageUrl: 'assets/demo/guard.jpg',
        },
        {
          imageUrl: 'assets/demo/guard.jpg',
          backgroundColor: '#41473A', // don't use if want to see back-cover inverted image
        }, // end guard section
      ],
      pageWidth: 550,
      pageHeight: 740,
      startPageType: PageType.Double,
      endPageType: PageType.Double
    } as Book;
    this.elem = document.documentElement;
  }
  toggleFullscreen() {
    if (screenfull.isEnabled) {
			screenfull.toggle();
		}
  }

  onPrev() {
    this.flipService.prev.next();
  }

  onNext() {
    this.flipService.next.next();
  }
  private modalService = inject(NgbModal);
	closeResult = '';

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}


}
