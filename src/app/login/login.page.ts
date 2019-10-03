import { Component, OnInit } from '@angular/core';
import {ServiceService }from '../service.service';
import {HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public alertController: AlertController ,private serviceservice : ServiceService,
    private http: HttpClient,private loadingController: LoadingController,
    public router : Router ) { }
  username:any;
  password:string;
  parser= new DOMParser;
  parserDocument;
  public data;
  model=false;
  public Att = {
    SubNm: [],
    AbbPrs: [],
    AbbNum: [],
};
  public Subject : any = [];
  public Subject2 : any = [];
  public Subject3 : any = [];

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true,
    });
    return await loading.present();
  }


    login(){
      //console.log(this.username);
      //console.log(this.password);

      let url='http://sis.rcyci.edu.sa/psc/ps/EMPLOYEE/HRMS/c/RCY_STD_ATTEND.RCY_STD_ATTEND.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.RCY_STD_ATTEND_GBL&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder&PortalActualURL=http%3a%2f%2fsis.rcyci.edu.sa%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fRCY_STD_ATTEND.RCY_STD_ATTEND.GBL&PortalContentURL=http%3a%2f%2fsis.rcyci.edu.sa%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fRCY_STD_ATTEND.RCY_STD_ATTEND.GBL&PortalContentProvider=HRMS&PortalCRefLabel=Absence%20Percentage&PortalRegistryName=EMPLOYEE&PortalServletURI=http%3a%2f%2fsis.rcyci.edu.sa%2fpsp%2fps%2f&PortalURI=http%3a%2f%2fsis.rcyci.edu.sa%2fpsc%2fps%2f&PortalHostNode=HRMS&NoCrumbs=yes&PortalKeyStruct=yes';
      let postData='timezoneOffset=-180&userid='+this.username+'&pwd='+this.password;
      //console.log(postdata);
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
          'Content-Type':  'application/x-www-form-urlencoded'
        }),
        responseType: 'text'
      };
      this.presentLoading();
      this.http.post(url,postData,httpOptions).toPromise().then(response => {
        this.data = response;
        this.loadingController.dismiss();
        if (this.data.indexOf(this.username)>=0 ){
          console.log("OK");
          this.parserDocument= this.parser.parseFromString(this.data,"text/html");
          
          for (let i =0; i <= 7; i++) {
            try {
      
              console.log("Im in Try")
              this.Att.AbbNum[i]= this.parserDocument.getElementById("RCY_ATTEND_TBL_SUBJECT$"+i).innerHTML;
              this.Att.AbbPrs[i] = this.parserDocument.getElementById("RCY_ATTEND_TBL_CATALOG_NBR$"+i).innerHTML;
              this.Att.SubNm[i] = this.parserDocument.getElementById("RCY_ATTEND_TBL_PERCENTAGE$"+i).innerHTML;
              console.log(this.Att.AbbNum[i]);
              if (this.Att.AbbNum[i]==null){
                console.log("IMH")
                i=8;
              }
              
            }
            catch(e){
              if(e instanceof RangeError){
                console.log('out of range');}
            }
          
          }

        }
        else this.presentAlert();
        
      
      })
      }

    
    btnClicked(){
      this.presentAlert();/*
      if (this.data.indexOf(this.username)>=0 ){
        console.log("OK");
      }
      else console.log("Nahh");
      */
        }

        async presentAlert() {
          const alert = await this.alertController.create({
            header: 'Worng ID or Password',
            subHeader: '',
            message: 'Please enter ID and Password again',
            buttons: ['OK']
          });
      
          await alert.present();
        }
  ngOnInit() {

    

  }

}
