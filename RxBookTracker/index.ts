import { Observable, of, from, fromEvent, concat, Subscriber, interval, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { allBooks, allReaders } from './data';
import { mergeMap, filter, tap, catchError, take, takeUntil } from 'rxjs/operators';

//#region Creating observables
// ending with $ is a RxJS naming convention
// let allBooksObservable$ = Observable.create((subscriber) => {
//     if(document.title !== 'RxBookTracker') {
//         subscriber.error('incorrect page title');
//     }

//     for (let book of allBooks) {
//         subscriber.next(book);
//     }

//     setTimeout(() => {
//         subscriber.complete();
//     }, 2000);

//     return () => console.log('Executing teardown code.');
// });

// allBooksObservable$.subscribe(book => console.log(book.title));

// let source1$ = of('hello', 10, true, allBooks[0], allReaders[0]);
// // source1$.subscribe(value => console.log(value));

// let source2$ = from(allBooks);
// // source2$.subscribe(book => console.log(book));

// concat(source1$, source2$).subscribe(value => console.log(value));

// let rdrsBtn = document.getElementById('rdrsBtn');

// fromEvent(rdrsBtn, 'click').subscribe(event => {
//     console.log(event);

//     // for(let rdr of allReaders) {
//     //     document.getElementById('readers').innerHTML += rdr.name + '<br>';
//     // }

//     // allReaders.forEach(rdr => document.getElementById('readers').innerHTML += rdr.name + '<br>');

//     allReaders.map(rdr => document.getElementById('readers').innerHTML += rdr.name + '<br>');
// });


// let rdrsBtn = document.getElementById('rdrsBtn');

// fromEvent(rdrsBtn, 'click').subscribe(event => {
//     ajax('api/readers').subscribe(ajaxResponse => {
//         console.log(ajaxResponse)
        
//         ajaxResponse.response.map(rdr => document.getElementById('readers').innerHTML += rdr.name + '<br>');
//     });
// });

//#endregion

//#region  Subscribing to Observables with Observers

// from(allBooks).subscribe({
//     next: book => console.info(`Title: ${book.title}`),
//     error: err => console.error(`ERROR: ${err}`),
//     complete: () => console.info('All done !!')
// });

// let currentTime$ = new Observable(Subscriber => {
//     const timeString = new Date().toLocaleTimeString();
//     Subscriber.next(timeString);
//     Subscriber.complete();
// });

// currentTime$.subscribe(currentTime => console.log(`Observer 1: ${currentTime}`));

// setTimeout(() => {
//     currentTime$.subscribe(currentTime => console.log(`Observer 2: ${currentTime}`));
// }, 1000);


// setTimeout(() => {
//     currentTime$.subscribe(currentTime => console.log(`Observer 3: ${currentTime}`));
// }, 2000);

// let tmrDiv = document.getElementById('times');
// let tmrBtn = document.getElementById('tmrBtn');

// let timer$ = interval(1000);

// let timer$ = new Observable(Subscriber => {
//     let i = 0;
//     let intervalID = setInterval(() => {
//         Subscriber.next(i++);
//     }, 1000);
//     return () => {
//         console.log('Executing teardown code.');
//         clearInterval(intervalID);
//     }
// });

// let tmrSubscription = timer$.subscribe(
//     value => tmrDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
//     null,
//     () => console.log('All done !!')
// );

// fromEvent(tmrBtn, 'click').subscribe( () => tmrSubscription.unsubscribe());

//#endregion

//#region Using Operators

// ajax('/api/errors/500')
//     .pipe(
//         mergeMap(ajaxResponse => ajaxResponse.response),
//         filter(book => book.publicationYear > 1950),
//         tap(oldBook => console.log(`Title: ${oldBook.title}`)),
//         // catchError(err => of({title: 'Corduroy', author: 'Don Freeman'}))
//         // catchError((err, caught) => caught)
//         // catchError(err => { throw `Something wrong happened - ${err}`; } )
//         catchError(err => { return throwError(err.message); } )
//     )
//     .subscribe(
//         value => console.info(`VALUE: ${value.title}`),
//         error => console.error(`ERROR: ${error}`)
//     );

let tmrDiv = document.getElementById('times');
let tmrBtn = document.getElementById('tmrBtn');

let timer$ = new Observable(Subscriber => {
    let i = 0;
    let intervalID = setInterval(() => {
        Subscriber.next(i++);
    }, 1000);
    return () => {
        console.log('Executing teardown code.');
        clearInterval(intervalID);
    }
});

let cancelTime$ = fromEvent(tmrBtn, 'click');

timer$.pipe(
    // take(3)
    takeUntil(cancelTime$)
)
.subscribe(
    value => tmrDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
    null,
    () => console.log('All done !!')
);



//#endregion