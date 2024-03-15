import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {map, Subject, Subscription} from "rxjs";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {


  private subject: Subject<number>;


  constructor(public cartService: CartService) {

    this.subject = new Subject<number>();
    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);

    const timeout1 = setTimeout(() => {
      this.subject.complete();
    }, 4000);

  }

  private subscription: Subscription | null = null;



  ngOnInit() {

    console.log(environment.production);

    // const myModalAlternative = new bootstrap.Modal('#myModal', {});
    // myModalAlternative.show();

    this.subscription = this.subject
      .subscribe(
      {
        next: (param: number) => {
          console.log('subscriber 1: ', param);
        },
        error: (error: string) => {
          console.log('ERROR!!!' + error);
        }
      }
    );
  }

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit() {
    this.popupComponent.open();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


// this.promise.then((param: string) => {
//   console.log(param);
// });


  test() {
    this.subject
    .pipe(
      map(number => {
        return 'Число: ' + number
      })
    )
    .subscribe((param: string) => {
      console.log('subscriber 2: ', param);
    });
  }
}
