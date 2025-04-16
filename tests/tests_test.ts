import { type Observable, Subject } from '../index.ts'
import { delay } from 'jsr:@std/async'
console.log(new Date().getSeconds(), ' --> start ')

function doSomethingAsync(): Observable<number> {
  const $s = new Subject<number>()
  let i = 0
  const interval = setInterval(() => {
    $s.next(new Date().getSeconds())
    i++
    if (i >= 10) {
      clearInterval(interval)
      $s.finish()
    }
  }, 10)
  return $s
}

const $res = doSomethingAsync()

$res
  .filter((it) => it % 2 === 0)
  .map((it) => it * 1000)
  .debounce(500)
  .subscribe((it) => {
    console.log(new Date().getTime(), it)
  })

await delay(3000)
