import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { auth, firestore } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // public user: Observable<User>;

  constructor(private fauth:AngularFireAuth, private afs: AngularFirestore) { 
    // this.getUser();
  }

  // getUser(){  
  //   this.user = this.fauth.authState.pipe(
  //     switchMap(User => {
  //       if(User){
  //         return this.afs.doc<User>(`Users/${User.uid}`).valueChanges();
  //       }
  //       return of(null);
  //     })
  //   );
  // }
  getUser():User{
    return window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")) : null;
  }

  async logout(): Promise<void>{
    try{
      await this.fauth.signOut();
      window.localStorage.removeItem("user");
    }
    catch (error){
      console.log('Error->',error);
    }
  }

  async register(userObj:User): Promise<User>{
    try{
      const { user } = await this.fauth.createUserWithEmailAndPassword(userObj.email,userObj.password);
      userObj.fechaAcceso = new Date(Date.now());
      userObj.uid = user.uid;
      if(userObj.tipo == "paciente"){
        user.sendEmailVerification();
      }
      await this.setUser(userObj);
      window.localStorage.setItem("user", JSON.stringify(userObj));
      return user;
    }
    catch(error){
      console.log('Error->', error);
    }
  }

  async login(email:string, password:string): Promise<User>{
    try{  
        const { user } = await this.fauth.signInWithEmailAndPassword(email,password);
        let insertUser:User = {
          email: user.email,
          uid: user.uid,
          fechaAcceso: new Date(Date.now())
        }
        await this.setUser(insertUser);
        return this.setUserStorage(user.uid);
        // return user;
    }
    catch (error){
      console.log('Error->', error);
    }
  }

  // async loginGoogle(): Promise<User>{
  //   try{
  //     const { user } = await this.fauth.signInWithPopup(new auth.GoogleAuthProvider());
  //     window.localStorage.setItem("user", user.toJSON().toString());
  //     return user;
  //   }
  //   catch (error){
  //     console.log('Error->',error);
  //   }
  // }

  setUserStorage(uid:string): Promise<User> {
    return this.afs.collection('Users').doc(uid)
    .get().toPromise().then(x =>{
      window.localStorage.setItem("user", JSON.stringify(x.data() as User));
      return x.data() as User;
    });;
  }

  setUser(user:User){
    user.fechaAcceso = new Date(Date.now());
    return this.afs.collection('Users').doc(user.uid).set(user, {merge: true});
  }
}
