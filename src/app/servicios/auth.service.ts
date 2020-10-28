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
  
  public user: Observable<User>;

  constructor(private fauth:AngularFireAuth, private afs: AngularFirestore) { 
    this.getUser();
  }

  getUser(){  
    this.user = this.fauth.authState.pipe(
      switchMap(User => {
        if(User){
          return this.afs.doc<User>(`Users/${User.uid}`).valueChanges();
        }
        return of(null);
      })
    );
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

  async register(email:string, password:string, username:string, tipo:string): Promise<User>{
    try{
      const { user } = await this.fauth.createUserWithEmailAndPassword(email,password);
      let insertUser:User = {
        email: user.email,
        uid: user.uid,
        username: username,
        fechaAcceso: new Date(Date.now()),
        tipo: tipo
      }
      await this.setUser(insertUser);
      user.sendEmailVerification();
      return user;
    }
    catch(error){
      console.log('Error->', error);
    }
  }

  async login(email:string, password:string): Promise<User>{
    try{  
        const { user } = await this.fauth.signInWithEmailAndPassword(email,password);
        window.localStorage.setItem("user", user.uid);
        let insertUser:User = {
          email: user.email,
          uid: user.uid,
          fechaAcceso: new Date(Date.now())
        }
        this.setUser(insertUser);
        console.info(user);
        return user;
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

  setUser(user:User){
    user.fechaAcceso = new Date(Date.now());
    return this.afs.collection('Users').doc(user.uid).set(user, {merge: true});
  }
}
