import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth.service';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
questions:any
answers1:any
sourcetext:any
mess:any
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
    this.getquestion()
  }
//function to call questons fromm data base

getquestion(){
  const details = ({
     email :localStorage.getItem('email')
  })
  console.log(details)
  this.Auth.getquestions(details).subscribe(data=>{
     this.questions =data.questions
    
  })
}
answers(title,image){

  const details = {
    email : localStorage.getItem('email'),
    question_title : title,
   
  question_image : image
  }

  this.Auth.Answers(details).subscribe(data=>{
   this.answers1 = data.msg
   console.log(this.answers1)
  })

}
question(){
const details = ({
  email : localStorage.getItem('email'),
     question_title : this.sourcetext,
   question_image : "req.body.question_image"
})
if(details.question_title==null){
  this.showNotification('top','center','All fields are required','warning')

}
else{
  this.Auth.addquestion(details).subscribe(data=>{
    this.mess = data.msg
    this.showNotification('top','center',data.msg,'warning')
    this.getquestion()

    
  })
}
}
}
