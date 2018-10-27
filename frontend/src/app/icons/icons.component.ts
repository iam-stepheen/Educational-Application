import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth.service';
import { EmailValidator } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
questions:any
sourcetext :any
Email:any
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
getquestion(){
  this.Auth.getquestion().subscribe(data=>{
   this.questions = data.results
  this.Email =  data.results[0].email
   
  })
}
translate(title,image,){
  const details = ({
    a: localStorage.setItem('question',title),
     b  : localStorage.setItem('image',image),
    
   
   })
  
}
question(){
  const sourcetext = this.sourcetext
  if(sourcetext == null){
    this.showNotification('top','center','All fields are required','warning')
  }
  else{
    const details = ({
      email : this.Email,
      question_image : localStorage.getItem('image'),
      question_title : localStorage.getItem('question'),
    
    question_answer:this.sourcetext,
        question_answer_url:"req.question_answer_url"
    })
    this.Auth.answer(details).subscribe(data=>{
      this.showNotification('top','center',data.msg,'warning')
    })
  }
 
 
}
}
