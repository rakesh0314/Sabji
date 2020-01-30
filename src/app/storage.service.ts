import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:Storage) { }

  public async setstore(keyname,data:any)
  {
    return this.storage.set(`setting:${ keyname }`,data);
  }

  public async getStore(keyname)
  {
   return await this.storage.get(`setting:${ keyname }`);
  }

  public async remove(keyname){
   return this.storage.remove(`setting:${ keyname }`);
    // return this.storage.set(`setting:${ keyname }`,data);

  }

  public async clear()
  {
    return this.storage.clear();
  }
}
