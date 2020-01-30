import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { StorageService } from './storage.service';
import { ToastController, LoadingController } from '@ionic/angular';

let headerJson = {
  'Auth_key': 'InfinityTest',
  'Service':'Sbjiadmin'
  };
  let headersConfig = new HttpHeaders(headerJson);
const   httpOptions =
{
  headers:headersConfig
};
const apiUrl = "https://sabji.co.in/APICI";

let resData:any; 
 

@Injectable({
  providedIn: 'root'
})
export class RestapiService {


  constructor(private httpClient: HttpClient,
    private storageService:StorageService, 
    private toastController:ToastController,
    private loadingController: LoadingController) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  async showWarnMsg(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      color: 'danger',
      position: 'top',
    });
    toast.present();
  }

  async showMsg(msg)
  {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      color: 'dark',
      position: 'top',
    });
    toast.present();
  }

  showloader()
  {
    this.loadingController.create({
      message:"Please wait",
      duration:1000
    }).then((res) => {
      res.present();
    });
  }

  sighupGetDetails(data):Observable<any>
  {
       const url = `${apiUrl}/create_account`;
      return this.httpClient.post(url,data,httpOptions);
  }

  getAllProducts():Observable<any>
  {
    const url = `${apiUrl}/get_product`;
    return this.httpClient.get(url,httpOptions);
  }

  login(data):Observable<any>
  {
    const url = `${apiUrl}/login`;
    return this.httpClient.post(url,data,httpOptions);
  }

  AddMyCart(prodId,unit,id,api):Observable<any>
  {
    const url = `${apiUrl}/Add_cart`;
    const data = {
      'Product_id':`${prodId}`,
      'unit':`${unit}`
    }
    const headers = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Sbjiadmin','ID':`${id}`,'Api_key':`${api}`});
    return this.httpClient.post(url,data,{headers:headers});
    
  }
  
  getAllCat():Observable<any>
  {
    const url = `${apiUrl}/View_Category`;
    return this.httpClient.get(url,httpOptions);
  }

  serrchByCat(catid):Observable<any> 
  {
    const url = `${apiUrl}/get_Product_Bycategory/${catid}`;
    return this.httpClient.get(url,httpOptions);
  }

  userData(id:string,api):Observable<any> 
  {
    const url = `${apiUrl}/profile/${id}`; 
    const headers = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Sbjiadmin','Api_key':`${api}`});
    let options = {headers:headers};
    return this.httpClient.get(url,options);
  }

  getCart(id,api):Observable<any>
  {
    const url = `${apiUrl}/view_cart`; 
    const headers = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Sbjiadmin','ID':`${id}`,'Api_key':`${api}`});
    return this.httpClient.get(url,{headers:headers});
  }

  getProdUnit(prodId):Observable<any>
  {
    const url = `${apiUrl}/Get_Unit/${prodId}`;
    return this.httpClient.get(url,httpOptions);
  }

  deleteCart(CartId,ID,Api_key):Observable<any>
  {
    const url= `${apiUrl}/delete_cart/${CartId}`;
    const headers = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Sbjiadmin','ID':`${ID}`,'Api_key':`${Api_key}`});
    return this.httpClient.delete(url,{headers:headers});
  }

  SearchProduct(prod):Observable<any>
  {
    const url = `${apiUrl}/serachProduct/${prod}`;
    return this.httpClient.get(url,httpOptions);
  }

  productDetails(id):Observable<any>
  {
    const url = `${apiUrl}/get_product_detail/${id}`;
    return this.httpClient.get(url,httpOptions);
  }

  ContactusSabji(data):Observable<any>
  {
    const url = `${apiUrl}/ContactUs`;
    return this.httpClient.post(url,data,httpOptions);
  }

  makeOrder(res,method,product,add)
  {
    const url = `${apiUrl}/order/${method.pay_op}`;
    const headers = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Sbjiadmin','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.post(url,{'product':product,'address':add.id},{headers:headers});
  }

  getOrderconfirm(res):Observable<any>
  {
    const url = `${apiUrl}/confirm_order`;
    const headers = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Sbjiadmin','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.get(url,{headers:headers});
  }

  orderDetails(res,id):Observable<any>
  {
    const url = `${apiUrl}/order_details/${id}`;
    const headers = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Sbjiadmin','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.get(url,{headers:headers});
  }

  orderHistory(res):Observable<any>
  {
    const url = `${apiUrl}/get_order_history`;
    const headers = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Sbjiadmin','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.get(url,{headers:headers});
  }

  getotp(phone):Observable<any>
  {
    const url = `${apiUrl}/send_OTP`;
    return this.httpClient.post(url,{'phone':`${phone}`},httpOptions);
  }

  aboutus():Observable<any>
  {
    const url = `${apiUrl}/About_us`;
    return this.httpClient.get(url,httpOptions);
  }

  resenOtp(otp,phone):Observable<any>
  {
    const url = `${apiUrl}/resendOtp`;
    return this.httpClient.post(url,{'phone':`${phone}`,'otp':`${otp}`},httpOptions);
  }

  updateuser(data):Observable<any>
  {
    const url =`${apiUrl}/updateUserdata`;
    return this.httpClient.put(url,data,httpOptions);
  }

  clientAdd(res):Observable<any>
  {
    const url = `${apiUrl}/getaddress`;
    const headers = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Sbjiadmin','ID':`${res.user_id}`,'Api_key':`${res.API_key}`});
    return this.httpClient.get(url,{headers:headers});
  }

  addAddress(data):Observable<any>
  {
    const url = `${apiUrl}/AddClientAddress`;
    return this.httpClient.post(url,data,httpOptions);
  }

  addnewaddress(data):Observable<any>
  {
    const url = `${apiUrl}/AddClientNewAddress`;
    return this.httpClient.post(url,data,httpOptions);
  }

  activebanner():Observable<any>
  {
    const url = `${apiUrl}/banner`;
    return this.httpClient.get(url,httpOptions);
  }

  getmyaddres(header):Observable<any>
  {
    const url = `${apiUrl}/clientaddress`;
    const headers = new HttpHeaders({'Auth_key': 'InfinityTest','Service':'Sbjiadmin','ID':`${header.user_id}`,'Api_key':`${header.API_key}`});
    return this.httpClient.get(url,{headers:headers});
  }

  passwordotp(phone):Observable<any>
  {
    const url = `${apiUrl}/resetpassotp`;
    return this.httpClient.post(url,{'phone':phone},httpOptions);
  }

  resetpassword(phone,password)
  {
    const url = `${apiUrl}/changepassword`;
    return this.httpClient.post(url,{'password':password.pass1,'phone':phone},httpOptions);
  }

  myterms():Observable<any>
  {
    const url = `${apiUrl}/terms`;
    return this.httpClient.get(url,httpOptions);
  }
  
}
