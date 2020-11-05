import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private afs: AngularFirestore) {
  }

  getAll(entidad:string){
    return this.afs.collection(entidad).valueChanges();
  }

  // setAllObj(entidad:string, obj:any){
  //   return this.afs.collection(entidad).add(obj);
  // }


  setObj(entidad:string, obj:any){
    return this.afs.collection(entidad).doc(obj.id).set(obj, {merge: true});
  }

  updateUser(obj:any){
    return this.afs.collection("Users").doc(obj.uid).set(obj, {merge: true});
  }

  removeObj(entidad:string, obj:any){
    return this.afs.collection(entidad).doc(obj.id).delete();
  }

  getWithFilter(entidad:string, campo:string, conector:any, dato:any){
    return this.afs.collection(entidad, ref => ref.where(campo, conector, dato)).snapshotChanges()
    .pipe(map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data();
        return data;
      });
    }));
  }
}
