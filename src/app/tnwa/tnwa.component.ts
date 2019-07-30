import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-tnwa',
    templateUrl: './tnwa.component.html',
    styleUrls: ['./tnwa.component.scss']
})
export class TnwaComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    log(x) {
        console.log(x);
    }

    submit(f) {
        console.log(f);
    }
}
