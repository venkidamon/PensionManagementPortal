import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PensionerDetails } from 'src/app/_models/pensionerDetails';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-pensioner-detail',
  templateUrl: './pensioner-detail.component.html',
  styleUrls: ['./pensioner-detail.component.css']
})
export class PensionerDetailComponent implements OnInit {
  pensionerDetail : PensionerDetails
  aadharNumber:string = this.route.snapshot.paramMap.get('aadharNumber')
  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadPensionerDetails()
  }

  loadPensionerDetails(){
    console.log(this.aadharNumber)
    this.accountService.getPensioner(this.route.snapshot.paramMap.get('aadharNumber')).subscribe(member => {
      this.pensionerDetail = member
      console.log(member)
      if(this.pensionerDetail == undefined){
        this.router.navigateByUrl('pensionerDetailByAadhar/' + this.aadharNumber )
      }
    }, error => {
      console.log(error)
    })
  }

}
