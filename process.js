
const parent=document.getElementById('Notes')
const text=document.getElementById('text')

function getTime() {
    let currentdate = new Date();
    return currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + "  "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes()
}

let array = JSON.parse(localStorage.getItem('Note')||'[]')
let textarray=JSON.parse(localStorage.getItem('N')|| '[]')

function add() {

    let child=document.createElement('div')
    if(array[0]===undefined)child.classList.add("custom","active")
    child.classList.add("custom")
    child.innerHTML=getTime()
    child.id="note"+(array.length+1)

    array.push(child.outerHTML)

    parent.appendChild(child)
    //parent.children.item(0).className="custom active"
    let arr=Array.from(parent.childNodes)

    for (let i = 0; i <arr.length; i++) {

        arr[i].addEventListener('click',function () {

            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";

            let val=arr[i].innerHTML.substring(0,arr[i].innerHTML.indexOf("<"))


            if(arr[i].className==="custom active")
            {
                text.value=val;
                textarray[i-1]=val
                localStorage.setItem('N',JSON.stringify(textarray))
            }

        })
    }
    localStorage.setItem('Note',JSON.stringify(array))
}

window.onload=function () {
    if(array!==null)
    {

        for(let i=0;i<array.length;i++)
        {
            parent.insertAdjacentHTML('beforeend',array[i])
            parent.children.item(0).className="custom active"
            if(textarray!==null)
            {
                parent.childNodes.item(i+1).innerHTML=textarray[i]+"<br>"+getTime()
            }
            parent.childNodes.item(i+1).addEventListener('click',function () {
                let val=parent.children.item(i).innerHTML.substring(0,parent.children.item(i).innerHTML.indexOf("<"))
                const current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";

                if(parent.childNodes.item(i+1).className==="custom active") {
                    textarray[i]=val
                    text.value = textarray[i]
                    localStorage.setItem('N',JSON.stringify(textarray))
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
            arr[i].innerHTML=text.value+"<br>"+getTime()
        }
    }
})


function deleteItem() {
    //localStorage.clear()
    let arr=Array.from(parent.childNodes)
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i].className==="custom active"){
            array.splice(-i,1)
            if(textarray!==null)textarray.splice(i-1,1)
            parent.removeChild(arr[i])
        }
    }
    parent.lastChild.className="custom active"
    localStorage.removeItem('Note')
    localStorage.removeItem('N')
    localStorage.setItem('N',JSON.stringify(textarray))
    localStorage.setItem('Note',JSON.stringify(array))

}
window.onhashchange=function () {
    let arr=Array.from(parent.childNodes)
    for (let i = arr.length-1; i >= 0; i--) {
        if(location.hash==="#"+arr[i].id)
        {
            let a=document.getElementsByClassName("custom active")
            a[0].className="custom"
            arr[i].className="custom active"
            text.value=arr[i].innerHTML.substring(0, arr[i].innerHTML.indexOf("<"))
            break
        }
    }
}