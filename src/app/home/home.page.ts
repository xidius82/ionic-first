import { Component } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user = {
    name: 'Simon Grimm',
        website: 'www.ionicacademy.com',
        address:
          {
            zip: '48149',
            city: 'Muenster',
            country: 'DE',
            
          },
          interests: [ 'Ionic','Angular','Youtube','Sports'
          ]
        };
  

requestObject: any;

  constructor(private sms: SMS, private http: HTTP, private dataService: DataService,
    private actionSheet: ActionSheetController, private alertSheet: AlertController, private loadingController: LoadingController, private router: Router) {}

  async presentActionSheet(){
    const actionSheet = await this.actionSheet.create(
      {
        header: 'Test Action Sheet',
        mode: 'ios',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            icon: 'trash',
            handler: () => {
             console.log("You clicked me"); 
            }
          },
          {
            text: 'Hello',
            role: 'destructive',
            icon: 'add',
            handler: () => {
             console.log("You Added me"); 
            }
          }
        ]
      }
    );
    await actionSheet.present();
  }

  async presentAlert(){
    const actionSheet = await this.alertSheet.create(
      {
        header: 'Alert',
        subHeader: 'Sub Alert',
        message: 'This is Alert Message',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
             console.log("You clicked me"); 
            }
          },
          {
            text: 'Okay',
            cssClass: 'secondary',
            handler: () => {
             console.log("Second Handler"); 
            } 
          },
          {
            text: 'Open Action Sheet',
            cssClass: 'primary',
            handler:  async() => {
             const action = await this.actionSheet.create(
               {
                header: 'Texting Action',
                buttons: [
                  {
                    text: 'text',
                    role: 'cancel',
                    handler: () => {
                     console.log("Hey Hello"); 
                    }
                  }
                ]
               }
             );
             await action.present();
            } 
          }
        ]
      }
    );
    await actionSheet.present();
  }

  async presentLoadingWithOptions(){
    const loading = await this.loadingController.create(
      {
       
        duration: 5000,
        message: "Please wait..",
       mode: 'md',
       translucent: true,
        cssClass: 'custom-class custom-loading'
      }
    );
    return await loading.present();
  }

  getRequest(){
      this.http.get( 'https://jsonplaceholder.typicode.com/todos/1',  {}, {})
      .then(data => {
        this.requestObject = data.data;
      })
      .catch(error => {
        this.requestObject = error;
      })
  }

  openDetailWithQueryParams(){
    let navigationExtras : NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.user)
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }

  openDetailWithService(){
    this.dataService.setData(42, this.user);
    this.router.navigateByUrl('/details/42');
  }

  openDetailWithState(){
    let navigationExtras : NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }

  sendSms(){
    this.sms.send('416123456', 'Hello world!');
  }

}
