# <1>

start->
IIFE->
end->
Timeout 
-因為setTimeout延遲1s執行

# <2>


start->
IIFE->
end->
Timeout->

# <3>

foo->
bar->
baz->

# <4>

foo->
baz->
bar->

# 總結  
setTimeout(fn,0)只是將事件插入進去，必須等到當前代碼執行完，才會去執行它回調函數