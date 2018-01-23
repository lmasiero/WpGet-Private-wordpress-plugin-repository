import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class UserService {


  constructor(private http: Http, private messageService: MessageService, private config:ConfigurationService) { }

  getList() {
    return this.http.get(this.config.apiHost+ 'api/user/All')
        .toPromise()
        .then(res => {
          console.log(res.json());
          return <any[]> res.json();
        })
        .then(data => data);
  }

  save(item: any)  {
      console.log(item);
      return this.http.post(this.config.apiHost+'api/user/Item', item)
      .catch((err: Response) => {
          this.messageService.add({severity: 'error', 
          summary: 'User Save Erorr', 
          detail: 'Error during save.'  });

          return Observable.throw(new Error("Error saving user"));
       }).toPromise(). then(data =>{
        this.messageService.add({severity: 'success', summary: 'User Saved', detail: 'User' + item.username + ' has been saved'
       + JSON.stringify(item)});
        return data[0];
       })   ; 
      
  }

  delete(item:any)  {
    console.log(item);
    return this.http.delete(this.config.apiHost+'api/user/Item/'+item.id)
    .toPromise()
    .then(res => <any[]> res.json().rows)
    .then(data => { 
      this.messageService.add({severity:'success', summary:'User deleted', detail: 'User' + item.username + ' has been deleted'});
      return data[0];
    });
    
  }

}
