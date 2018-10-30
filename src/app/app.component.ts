import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   title = 'HackerAPI_Demo';
   details:any=[];
   ids:any=[];
	
	constructor(private httpClient:HttpClient,public spinner:NgxSpinnerService){}
  
	ngOnInit() {
		this.spinner.show();
		let Options = {headers: new HttpHeaders({
			'Content-Type':'application/json',
		})};	//set the header for post the data
			
		this.httpClient.get('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty',Options)
		.subscribe(
			data => {	

				//console.log('response ', data)
				//console.log('response ', data.length)
				this.ids.push(data);
				for(let i=0; i< this.ids[0].length;i++){
					this.apiCall(data[i])
				}
			},
			error => {
				alert("unable to connect server");
			}
		);
		
	}
	
	apiCall(id){
		let Options = {headers: new HttpHeaders({
			'Content-Type':'application/json',
		})};	
		
		this.httpClient.get("https://hacker-news.firebaseio.com/v0/item/"+id+".json",Options)
		.subscribe(result => {
			this.details.push(result);
			this.spinner.hide();
		},
		error => {
			alert("unable to connect server");
		});
	}
}
