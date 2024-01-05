import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js"
import {getDatabase,push,ref,onValue} from  "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js"

const appSettings={
    databaseURL:"https://real-time-posting-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const endorsementsInDB=ref(database,"endorsements")

const textAreaEl=document.getElementById("textarea-element")
const publishBtn=document.getElementById("publish-btn")
const fromEl=document.getElementById("input-from")
const toEl=document.getElementById("input-to")
const messageSection=document.getElementById("messages-section")


publishBtn.addEventListener("click",function(){
    let textAreaValue=textAreaEl.value
    let fromElValue=fromEl.value
    let toElValue=toEl.value

    let endorsementsObj={
        receiver:`${toElValue}`,
        message:`${textAreaValue}`,
        sender:`${fromElValue}`
    }
    push(endorsementsInDB,endorsementsObj)
    clearValues()
})

onValue(endorsementsInDB,function(snapshot){
    let messageArray=Object.entries(snapshot.val())
    messageSection.innerHTML=""
    for(let i=messageArray.length-1;i>=0;i--){
        displayOnPage(messageArray[i])
    }
})

function clearValues(){
    textAreaEl.value=""
    fromEl.value=""
    toEl.value=""
}

function displayOnPage(endorsements){
    let messageBlock=document.createElement("div")
    let fromPara=document.createElement("p")
    let messagePara=document.createElement("p")
    let toPara=document.createElement("p")
    let heartPara=document.createElement("p")
    let footer=document.createElement("div")
    toPara.className="titles"
    fromPara.className="titles"
    messageBlock.className="message-block"
    footer.className="footer"
    heartPara.textContent="🖤4"
    toPara.textContent=`To ${endorsements[1].receiver}`
    fromPara.textContent=`From ${endorsements[1].sender}`
    messagePara.textContent=`${endorsements[1].message}`
    footer.append(fromPara)
    footer.append(heartPara)
    messageBlock.append(toPara)
    messageBlock.append(messagePara)
    messageBlock.append(footer)
    messageSection.append(messageBlock)
}
