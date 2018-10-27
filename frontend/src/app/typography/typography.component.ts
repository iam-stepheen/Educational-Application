import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth.service';
declare var $: any;
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
equation1:String
answer1:String
equation2:String
answer2:String
respect2:String
equation3:String
answer3:String
respect3:String
answer4:any
a:String
b:String
c:String
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
submit1(){
const details = ({
  problem:"algebra",
  equation:this.equation1
})
if(details.equation == null){
  this.showNotification('top','center','Please Enter An Equation','warning')
}
else{
   this.Auth.equation(details).subscribe(data=>{
     this.answer1 = data.answer
   })
}
}
submit2(){
  const details = ({
    problem:"differentiaton",
    respect:this.respect2,
    equation:this.equation2
  })
  
  if(!this.Auth.validateatediff(details)){
    this.showNotification('top','center','All fields are required','warning')
  }
  else{
     this.Auth.equation(details).subscribe(data=>{
       this.answer2 = data.answer
     })
  }
  }
  submit3(){
    const details = ({
      problem:"integration",
      respect:this.respect3,
      equation:this.equation3
    })
    
    if(!this.Auth.validateint(details)){
      this.showNotification('top','center','All fields are required','warning')
    }
    else{
       this.Auth.equation(details).subscribe(data=>{
         this.answer3 = data.answer
       })
    }
  }
  submit4(){
    const details = ({
      problem:"quadratic",
      a:this.a,
      b:this.b,
      c:this.c
    })
     console.log(details)
    if(!this.Auth.validateatequad(details)){
      this.showNotification('top','center','All fields are required','warning')
    }
    else{
       this.Auth.equation(details).subscribe(data=>{
         this.answer4 = data.answer
       })
    }
  }
}
