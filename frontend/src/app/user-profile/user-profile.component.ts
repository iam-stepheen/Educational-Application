import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:any
  firstname:String
        secondname:String
        email:String
        password:String
        address:String
        city:String
        country:String
        postalcode:String
        aboutme:String
  constructor(private Auth:AuthService) { }

  ngOnInit() {
    this.gettoken()
  }
//we get token from loval storage 
//function to get all the details of the user 
gettoken(){
  const token = localStorage.getItem('token')
  this.Auth.submittoken(token).subscribe(data=>{
   this.user = data
   console.log(this.user)
  })
}
updateprofile(){
     const details = {
      firstname:this.firstname,
      secondname:this.secondname,
      email:this.email,
      password:this.password,
      address:this.address,
      city:this.city,
      country:this.country,
      postalcode:this.postalcode,
      aboutme:this.aboutme,
     }

     console.log(details)
}

   
}