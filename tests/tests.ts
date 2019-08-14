import { Observable, Subject } from "../index";

console.log(new Date().getSeconds(), " --> start ")

function doSomethingAsync(): Observable<number> {
    let $s = new Subject<number>()
    let i = 0
    let interval = setInterval(() => {
        $s.next(new Date().getSeconds())
        i++
        if (i >= 1000) {
            clearInterval(interval)
            $s.finish()
        }
    }, 10);
    return $s
}


let $res = doSomethingAsync()

$res
    .filter(it => it % 2 == 0)
    .map(it => it * 1000)
    .debounce(500)
    .subscribe(it => console.log(new Date().getSeconds(), it))