import { Injectable } from '@angular/core';
import {Headers,Http} from '@angular/http'
import "rxjs/add/operator/map"
import { tokenNotExpired } from 'angular2-jwt';
import fetch from 'node-fetch'
@Injectable()
export class AuthService {

  constructor(private http:Http) { }
  validateregister(details){
    if(details.firstname==null||details.aboutme==null||details.secondname==null||details.email==null||details.password==null,details.cpassword==null){
      return false
    }
    else{
      return true
    }
  }
  validateatelogin(details){
    if(details.email==null||details.password==null){
      return false
    }
    else{
      return true
    }
  }

  validateatediff(details){
    
    if(details.equation == null||details.respect==null||details.problem==null){
      return false
    }
    else{
      return true
    }
  }

  validateatequad(details){
    
    if(details.problem == null||details.a==null||details.b==null||details.c==null){
      return false
    }
    else{
      return true
    }
  }

  validateint(details){
    if(details.equation == null||details.respect==null||details.problem==null){
      return false
    }
    else{
      return true
    }
  }

  validatetranslate(details){
    if(details.sourcetext==null||details.sourcelang==null||details.translatelang==null){
      return false
    }
    else{
      return true
    }
  }

  validatesearch(details){
    if(details.title==null){
      return false
    }
    else{
      return true
    }
  }
  register(details){
    let headers = new Headers
    headers.append('Content-Type','application/json')
    return this.http.post('http://localhost:4000/api/register',details,{headers})
    .map(res=>res.json())
}
login(details){
  let headers = new Headers
  headers.append('Content-Type','application/json')
  return this.http.post('http://localhost:4000/api/login',details,{headers})
  .map(res=>res.json())
}
submittoken(details){
  //console.log(details)
  let headers = new Headers()
  headers.append('Authorization',details)
 return this.http.get('http://localhost:4000/api/profile',{headers:headers})
  .map(res=>res.json().user)
}
search(details){
  //console.log(details)
  let headers = new Headers()
  headers.append('Content-Type','application/json')
 return this.http.post('http://localhost:4000/api/booksearch',details,{headers:headers})
  .map(res=>res.json())
}
equation(details){
  //console.log(details)
  let headers = new Headers()
  headers.append('Content-Type','application/json')
 return this.http.post('http://localhost:4000/api/equations',details,{headers:headers})
  .map(res=>res.json())
}
getquestions(email){
  let headers = new Headers()
  headers.append('Content-Type','application/json')
 return this.http.post('http://localhost:4000/api/getquestions',email,{headers:headers})
  .map(res=>res.json())
}
Answers(email){
  let headers = new Headers()
  headers.append('Content-Type','application/json')
 return this.http.post('http://localhost:4000/api/getanswers',email,{headers:headers})
  .map(res=>res.json())
}
addquestion(email){
  let headers = new Headers()
  headers.append('Content-Type','application/json')
 return this.http.post('http://localhost:4000/api/question',email,{headers:headers})
  .map(res=>res.json())
}
getquestion(){
  
 return this.http.get('http://localhost:4000/api/getallquestions')
  .map(res=>res.json())
}
answer(email){
  let headers = new Headers()
  headers.append('Content-Type','application/json')
 return this.http.post('http://localhost:4000/api/answer',email,{headers:headers})
  .map(res=>res.json())
}
loggedIn() {

  return tokenNotExpired();
}
}
