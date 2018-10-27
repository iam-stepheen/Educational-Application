import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth.service';
import { AnimationQueryOptions } from '@angular/animations';
import Speech from 'speak-tts'
import fetch from 'node-fetch'
declare var $: any;
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']

})
export class TableListComponent implements OnInit {
title : String
books : any
sourcelang:String
translatelang:String
sourcetext:any
sourcetext22:any
translated:any
translated2:any
speechs:any

  constructor(private Auth:AuthService) { }
  showNotification(from, align,msg,typ){
    const type = ['','info','success','warning','danger'];
    

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: msg

    },{
        type: type[color],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
  ngOnInit() {

  }
search(){
 const details = ({
   title:this.title
 })
 if(!this.Auth.validatesearch(details)){
  this.showNotification('top','center','Search Field Cannot Be Empty','warning')
}
else{
  this.Auth.search(details).subscribe(data=>{
    
    this.books = data.results
    console.log(this.books)
  })
}
}
speech(){
 const details = ({
  sourcetext:this.sourcetext22,
 })
 console.log(details)
  const speech = new Speech()
speech.init().then((data) => {
  this.speechs = data
  // console.log(this.speechs)
    // The "data" object contains the list of available voices and the voice synthesis params
   // console.log("Speech is ready, voices are available", data)
}).catch(e => {
    console.error("An error occured while initializing : ", e)
})
speech.speak({
  text: details.sourcetext,
  queue:false,
  listeners: {
    onstart: () => {
        console.log("Start utterance")
    },
    onend: () => {
        console.log("End utterance")
    },
    onresume: () => {
        console.log("Resume utterance")
    },
    onboundary: (event) => {
        console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.')
    }
}
}).then(() => {
  console.log("Success !")
}).catch(e => {
  
 
  console.error("An error occurred :", e)
})
}
translate(){
const details = ({
  sourcetext:this.sourcetext,
  sourcelang:this.sourcelang,
  translatelang:this.translatelang
})
if(!this.Auth.validatetranslate(details)){
  this.showNotification('top','center','All fields Are Required','warning')
}
else{
  fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
 + details.sourcelang + "&tl=" + details.translatelang+ "&dt=t&q=" + encodeURI(details.sourcetext)).
 then(res=>res.json()).
 then(body=>{
  function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

   var translatedText= []
  
    for(var i = 1; i <=  body[0].length; ++i){
    
      for(var j = 0; j<body[0].length-1; ++j ){
        
        translatedText.push(body[0][j][0])
  
     
        
       }
     
    if(i==1){
     
      console.log(translatedText)
      this.translated2 =translatedText.filter( onlyUnique );
        
    }
    
   
  }
  
  
 }
 )
}
}
print(): void {
  console.log("xx")
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title>Translated Document (Developed by GrayBot)</title>
       
        <link rel="stylesheet" type:"text/css" href="assets/css/bootstrap.min.css">
        
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
  );
  popupWin.document.close();
}
}
