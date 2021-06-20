import { Observable, of, from, fromEvent, concat } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { allBooks, allReaders } from './data';

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


let rdrsBtn = document.getElementById('rdrsBtn');

fromEvent(rdrsBtn, 'click').subscribe(event => {
    ajax('api/readers').subscribe(ajaxResponse => {
        console.log(ajaxResponse)
        
        ajaxResponse.response.map(rdr => document.getElementById('readers').innerHTML += rdr.name + '<br>');
    });
});