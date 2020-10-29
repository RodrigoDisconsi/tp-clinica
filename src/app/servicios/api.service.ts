import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  // getOneActor(idActor:string){
  //   return 
  // }


  setObj(entidad:string, obj:any){
    return this.afs.collection(entidad).doc(obj.id).set(obj, {merge: true});
  }

  removeObj(entidad:string, obj:any){
    return this.afs.collection(entidad).doc(obj.id).delete();
  }

  // getPeliculasXActor(obj:any){
  //   return this.afs.collection('peliculas', ref => ref.where('actor', '==', obj)).snapshotChanges()
  //   .pipe(map(changes => {
  //     return changes.map(action => {
  //       const data = action.payload.doc.data() as PeliculaInterface;
  //       return data;
  //     });
  //   }));
  //   }
}
