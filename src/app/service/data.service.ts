import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class DataService {
    loginCheck=false
    constructor(private http:HttpClient){}
    //Function to genrate JWT token
    getToken(body:any){
        const url=`${environment.TEAM_API}auth/login`
        let res:any= this.http.post(url,body).pipe(map((data:any)=>{
            localStorage.removeItem('token');
            localStorage.setItem('token',data.access_token)
            return data
        }))
        this.loginCheck=true
        return res
    }
    //Function to Logout user
    logout(){
        this.loginCheck=false
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    //Function check login
    getLoginCheck(){
        return this.loginCheck
    }
    //Fucntion to get token
    getLoggedInToken(){
        return localStorage.getItem('token');
    }
    //Function to fetch user info
    getUser(token:any){
        const url=`${environment.TEAM_API}profile`
        const headers={
            "Content-Type": "application/json",
            "Authorization":"Bearer "+token
        }
        let res:any= this.http.get(url,{headers}).pipe(map((data:any)=>{
            localStorage.removeItem('user');
            localStorage.setItem('user',data)
            return data
        }))
        return res
    }
    //Function to get user info
    getLoggedInUser(){
        return localStorage.getItem('user');
    }
    //Function to fetch all players
     getAll(token:any){
        const url=`${environment.TEAM_API}players`
        const headerOpts={
            Authorization:"Bearer "+token
        }
        const res=this.http.get(url,{headers:headerOpts})
        return res
    }
    //Function to create teams
    team(token:any,body:any){
        const url=`${environment.TEAM_API}team`
        const headers={
            "Content-Type": "application/json",
            "Authorization":"Bearer "+token
        }
        const res=this.http.post(url,body,{headers})
        return res
    }
    //Function to de-select teams
    remove(token:any,body:any){
        const url=`${environment.TEAM_API}remove`
        const headers={
            "Content-Type": "application/json",
            "Authorization":"Bearer "+token
        }
        const res=this.http.post(url,body,{headers})
        return res
    }
    //Function to fetch team
    getTeam(token:any){
        const url=`${environment.TEAM_API}team`
        const headers={
            "Content-Type": "application/json",
            "Authorization":"Bearer "+token
        }
        const res=this.http.get(url,{headers})
        return res
    }
    //Function to sing up
    signUp(body:any){
        const headers={
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
        const url=`${environment.TEAM_API}signup`
        let res:any= this.http.post(url,body)
        return res
    }

}