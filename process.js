
const parent=document.getElementById('Notes')
const text=document.getElementById('text')
//location.hash="note0"
function getTime() {
    let currentdate = new Date();
    return currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + "  "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds()
}
let array;
if(JSON.parse(localStorage.getItem('Note'))!==null){
    array = JSON.parse(localStorage.getItem('Note'));
}
else {
    array = [];
}
function add() {

    let child=document.createElement('div')
    if(array[0]===undefined)child.classList.add("custom","active")
    child.classList.add("custom")
    child.innerHTML=getTime()
    console.log(array.length)
    child.id="note"+(array.length+1)
    console.log(child.id)
    // console.log(location.hash)
    array.push(child.outerHTML)

    parent.appendChild(child)
    console.log(parent.lastChild.id)
    let arr=Array.from(parent.childNodes)
    let ar
    if(JSON.parse(localStorage.getItem('N'))!==null)
    {
        ar=JSON.parse(localStorage.getItem('N'))
    }
    else
    {
        ar=[]
    }
    for (let i = 0; i <arr.length; i++) {

        arr[i].addEventListener('click',function () {

            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";

            var splitter=arr[i].innerHTML.search(/\d/)
            var val=arr[i].innerHTML.split(arr[i].innerHTML.charAt(splitter))

            if(arr[i].className==="custom active")text.value=val[0].substring(0,val[0].indexOf("<"));
            var temp=[]
                if(JSON.parse(localStorage.getItem('N'))!==null)
                {
                    temp=JSON.parse(localStorage.getItem('N'))
                }
            if(arr[i].className==="custom active"&&val[0]!==""&&val[0]!==temp[i-1])
            {
                ar.push(val[0].substring(0,val[0].indexOf("<")))
                console.log(val[0])
                localStorage.setItem('N',JSON.stringify(ar))
            }
            //localStorage.setItem('Helper',JSON.stringify(val[0]))

        })
    }
    localStorage.setItem('Note',JSON.stringify(array))
    //console.log(JSON.parse(localStorage.getItem('Note'))[0].toString())
}

window.onload=function () {
    if(JSON.parse(localStorage.getItem('Note'))!==null)
    {
        const x=JSON.parse(localStorage.getItem('Note'))
        const y=JSON.parse(localStorage.getItem('N'))
        for(let i=0;i<x.length;i++)
        {
            //console.log(parent.childNodes.item(i).id)
            //console.log(i)
            parent.insertAdjacentHTML('beforeend',x[i])
            //console.log(y[i])
            if(y!==null){parent.childNodes.item(i+1).innerHTML=y[i]+"<br>"+getTime()}
            parent.childNodes.item(i+1).addEventListener('click',function () {
                const current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";

                if(parent.childNodes.item(i+1).className==="custom active") {
                    text.value = y[i]
                }
            })


        }

    }
}
text.addEventListener('input',function () {
    let arr=Array.from(parent.childNodes)
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i].className==="custom active"){
            if(arr[i].innerHTML.length>50)break;
            arr[i].innerHTML=text.value+"<br>"+getTime()
        }
    }
    //localStorage.setItem('Text',JSON.stringify(arr))
})


function deleteItem() {
    //localStorage.clear()
    let arr=Array.from(parent.childNodes)
    let textval=JSON.parse(localStorage.getItem('N'))
    // console.log("BEFORE")
    // for (let i = 0; i < textval.length; i++) {
    //     console.log(textval[i])
    // }
    // console.log(array.length)
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i].className==="custom active"){
            array.splice(-i,1)
            if(textval!==null)textval.splice(i-1,1)
            parent.removeChild(arr[i])
        }
    }
    parent.lastChild.className="custom active"
    localStorage.removeItem('Note')
    // console.log("THEN")
    // for (let i = 0; i < textval.length; i++) {
    //     console.log(textval[i])
    // }
    localStorage.removeItem('N')
    localStorage.setItem('N',JSON.stringify(textval))
    localStorage.setItem('Note',JSON.stringify(array))
    //console.log(array.length)

}
window.onhashchange=function () {
    alert("HASH CHANGED")
    let ar=Array.from(parent.childNodes)
    for (let i = ar.length-1; i >= 0; i--) {
        console.log(ar[i].id)
        if(location.hash==="#"+ar[i].id)
        {
            // let current = document.getElementsByClassName("active");
            // current[0].className = current[0].className.replace(" active", "");
             let a=document.getElementsByClassName("custom active")
            a[0].className="custom"
            ar[i].className="custom active"
            var splitter=ar[i].innerHTML.search(/\d/)
            var val=ar[i].innerHTML.split(ar[i].innerHTML.charAt(splitter))
            text.value=val[0].substring(0,val[0].indexOf("<"))

            break
        }
    }
}