import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map} from 'rxjs/operators';
import { PensionerDetails } from '../_models/pensionerDetails';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})


export class AccountService {
  baseUrl = 'https://localhost:7263/api/'
  pensionerDetailsUrl = 'https://localhost:7197/api/'

  private currentUserSource = new ReplaySubject<User>(1);

  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }



  login(model:User){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response : User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account', model).pipe(
      map((user : User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }

      })
    );
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  getPensioner(aadharNumber: string){
    return this.http.get<PensionerDetails>(this.pensionerDetailsUrl+'pensionerDetailByAadhar/'+aadharNumber);
  }

  lookPensioner(aadharNumber: string){
    return this.http.get<PensionerDetails>(this.pensionerDetailsUrl+'pensionerDetailByAadhar/'+aadharNumber).pipe(
      map((response) => {
        if(response){
          return true
        }
        return false
      })
    )
  }

  storePensioner(model:PensionerDetails){
    return this.http.post<PensionerDetails>(this.pensionerDetailsUrl + 'pensionerDetailByAadhar', model).pipe(
      map((response => {
        if(response == null){
          console.log(response)
        }
        else{
          console.log(response)
        }
      }))
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
