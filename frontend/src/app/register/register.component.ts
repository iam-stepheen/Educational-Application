import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service'
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
firstname:string
secondname:string
email:string
password:string
aboutme:String
cpassword:string
//regLog = false

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
//function to register user 
register(){
const details = ({
  firstname:this.firstname,
  secondname:this.secondname,
  email:this.email,
  password:this.password,
  cpassword:this.cpassword,
  aboutme:this.aboutme
  
})
if(!this.Auth.validateregister(details)){
  this.showNotification('top','center','All fields are required','warning')
}
else{
  if(details.password == details.cpassword){
    this.Auth.register(details).subscribe(data=>{
      if(data.success == true){
        this.showNotification('top','center',data.msg,'warning')
        this.firstname = null
        this.secondname= null
        this.password=null,
        this.email = null
        this.cpassword=null
        this.aboutme=null
      }
      else{
        this.showNotification('top','center',data.msg,'warning')
      }
    })
  }
  else{
    this.showNotification('top','center','password doesnt Match','warning')
  }
 
}
}
}
