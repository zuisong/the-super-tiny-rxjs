```

import { Observable, Subject } from "../super-tiny-rx";

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
```

### 写在最后

这个项目最初是用在执行浏览器书签里的 JS 代码, 由于书签严格限制了长度, 无法使用原版的 rxjs 库, 自己又很喜欢用 rxjs 来组织异步代码, 于是写了这个项目, 项目上线了很久了, 今天把这个小工具剥离出来, 单独成一个库

目前仅支持rxjs几个常用的操作符, 暂时也没有计划支持更多的操作符, 更多的是为了满足使用需求, 希望可以给遇到一样问题的同学一点点帮助

PS: 这个项目应该是可以用在小程序上的, 我没有测试
