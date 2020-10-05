
const parent=document.getElementById('Notes')
const text=document.getElementById('text')
parent.removeChild(parent.firstChild)

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
    child.classList.add("custom")
    child.innerHTML=getTime()
    child.id="note"+(array.length+1)
    array.push(child.outerHTML)
    parent.appendChild(child)

    let arr=Array.from(parent.childNodes)

    for (let i = 0; i <arr.length; i++) {

        arr[i].addEventListener('click',function () {

           // extracted(arr,i)

            const current = document.getElementsByClassName("active");
            if (current.length === 1) current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
            let val=arr[i].innerHTML.substring(0,arr[i].innerHTML.indexOf("<"))

            if(arr[i].className==="custom active")
            {
                text.value=val;
                textarray[i]=val
                localStorage.setItem('N',JSON.stringify(textarray))
            }
            location.hash=arr[i].id
            console.log(trans(location.hash))
        })
    }
    localStorage.setItem('Note',JSON.stringify(array))
}



window.onload=function () {
    if(array!==null)
    {
        //console.log(array.length)
        for(let i=0;i<array.length;i++)
        {
            parent.insertAdjacentHTML('beforeend',array[i])
            parent.childNodes.item(i).id="note"+(i+1)
            if(textarray!==null)
            {
                parent.childNodes.item(i).innerHTML=textarray[i]+"<br>"+getTime()
            }

            if(location.hash==="#"+parent.childNodes.item(i).id){
                const current = document.getElementsByClassName("active");
                if (current.length === 1) current[0].className = current[0].className.replace(" active", "");
                parent.childNodes.item(i).className += " active";
                text.value=parent.childNodes.item(i).innerHTML.substring(0, parent.childNodes.item(i).innerHTML.indexOf("<"))
            }
            else if(location.hash===""){
                const current = document.getElementsByClassName("active");
                if (current.length === 1) current[0].className = current[0].className.replace(" active", "");
                text.value=""
            }

            parent.childNodes.item(i).addEventListener('click',function () {
                location.hash=parent.childNodes.item(i).id
                let val=parent.children.item(i).innerHTML.substring(0,parent.children.item(i).innerHTML.indexOf("<"))
                const current = document.getElementsByClassName("active");
                if (current.length === 1) current[0].className = current[0].className.replace(" active", "");
                parent.childNodes.item(i).className += " active";

                if(parent.childNodes.item(i).className==="custom active") {
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
            if(textarray!==null)textarray.splice(i,1)
            parent.removeChild(arr[i])
        }
    }
    arr=Array.from(parent.childNodes)

    for (let i = 0; i < arr.length; i++) {
        arr[i].id="note"+(i+1)
    }

    localStorage.removeItem('Note')
    localStorage.removeItem('N')
    localStorage.setItem('N',JSON.stringify(textarray))
    localStorage.setItem('Note',JSON.stringify(array))
    parent.lastChild.className="custom active"
}

window.onhashchange=function () {
    let arr=Array.from(parent.childNodes)
    for (let i = 0; i < arr.length; i++) {
        if(location.hash==="#"+arr[i].id)
        {
            const current = document.getElementsByClassName("active");
            if (current.length === 1) current[0].className = current[0].className.replace(" active", "");
            arr[i].className="custom active"
            text.value=arr[i].innerHTML.substring(0, arr[i].innerHTML.indexOf("<"))
            break
        }

    }
    if(location.hash==="")
    {
        const current = document.getElementsByClassName("active");
        if (current.length === 1) current[0].className = current[0].className.replace(" active", "");
        text.value=""
    }
}