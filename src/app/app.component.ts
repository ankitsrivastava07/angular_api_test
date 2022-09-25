import { Component, Inject } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http'
import { RequestDto } from './request-dto';
import { SnackbarService } from './snackbar.service';
import { HttpService } from './http.service';
import { FormGroup, NgForm } from '@angular/forms';
import { LoadingService } from './loading.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api-test';
  api = 'http://localhost:8080/call-external-api'

  model = new RequestDto('','','');
  keyValue: any;
  defaultOption='Select Method';
  errorDefaultMsg = 'Something went wrong. Please try again later'
  token:any=''

  constructor(private httpService: HttpService, private snackBarService: SnackbarService , public loadingService: LoadingService) {
      this.httpService.get().subscribe(data => {
   this.token = data;
   localStorage.setItem("KEY" ,this.token.KEY);
     });
        
    }

sendRequest(requestDto: NgForm){
  this.keyValue = ''
  let requestBody = {
    "requestBody" : requestDto
  }

  this.httpService.sendRequest(requestDto).subscribe(data => {
  this.keyValue = data
  },
  (error: HttpErrorResponse) =>{
   this.keyValue = error.error.errors;

   if(error.status == 500){
     this.keyValue = ''
     this.snackBarService.showNotification(this.errorDefaultMsg);
   }

   if(error.status == 408){
    this.keyValue = ''
    this.snackBarService.showNotification(error.error.errors.timeout);
  }

  if(error.status == 404){
    this.snackBarService.showNotification(error.error.errors);
  }

  if(error.status == 400 && error.error.errors.isKeyExist === false){
    this.snackBarService.showNotification(error.error.errors.KeyMissing);
  }

  if(error.status == 400 && error.error.errors.isKeyExist === false){
    this.snackBarService.showNotification(error.error.errors.KeyMissing);
  }


  }

  );
}

setToken(){

}

}

