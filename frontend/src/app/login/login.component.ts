import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service'
import {Router} from "@angular/router"
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
email:string
password:string
regLog = false
rl2 = false
  constructor(private Auth:AuthService,private router:Router) { }
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
    localStorage.setItem('sidebar','false')
  }
login(){
  const details = ({
    
    email:this.email,
    password:this.password,
   
    
  })
  if(!this.Auth.validateatelogin(details)){
    this.showNotification('top','center','All fields are required','warning')
  }
  else{
   this.Auth.login(details).subscribe(data=>{
    if(data.success == false){
      this.showNotification('top','center',data.msg,'warning')
    }
    else{
      localStorage.setItem('token',data.token)
      localStorage.setItem('email',data.user.email)
      localStorage.setItem('sidebar','true')
      this.router.navigate(['/dashboard'])
    }
     
   })
}
}
}

