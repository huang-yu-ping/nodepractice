## (1)請問下列程式執行後的結果為何？為什麼？
>
```
console.log("start");

(function () {
    console.log("IIFE");
    setTimeout(function () {
        console.log("Timeout");
    }, 1000);
    })();

    console.log("end");

```

***

##### console 結果 :
>start->IIFE->end->Timeout<br>
>因為有設定setTimeout，所以1秒後才會執行Timeout

## (2)請問下列程式執行的結果為何？為什麼？


```
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();

console.log("end");

```

***

##### console 結果 :
>start->IIFE->end->Timeout<br>
>setTimeout(fn,0)將事件放入web Apis，必須等到當前代碼執行完，才會去執行回調函數

## (3)請問下列程式執行的結果為何？為什麼？

```
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  bar();
  baz();
};

foo();

```

***

##### console 結果 :
>foo->bar->baz<br>
>因為3者都是fn,首先呼叫了foo 所以先出現foo,然後呼叫了bar()再來baz(),所以出現bar再來baz



## (4)請問下列程式執行的結果為何？為什麼？

```
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  setTimeout(bar, 0);
  baz();
};

foo();

```

***

##### console 結果 :
>foo->baz->bar<br>
>首先呼叫了foo,先出現foo,因為setTimeout(fn,0)將事件放入web Apis，必須等到當前代碼執行完，才會去執行回調函數,所以先baz再來bar

