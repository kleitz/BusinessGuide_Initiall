import { Component } from '@angular/core';
import { NavController,IonicApp } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, app: IonicApp) {

  }
  ionViewWillEnter(){
    document.getElementById('menu_button').hidden = true;
    this.drawCanvas();
  }

drawCanvas() {
  var canvas = <HTMLCanvasElement>document.getElementById("my_canvas");
  var context = canvas.getContext("2d");

  context.rect(0, 0, canvas.width, canvas.height);

  // create radial gradient
  //var grd = context.createRadialGradient(75,50,5,90,60,100);
  var grd = context.createLinearGradient(0,0,canvas.width, canvas.height);
  // light blue
  grd.addColorStop(0, '#555555');
  // dark blue
  grd.addColorStop(1, '#BBBBBB');

  context.fillStyle = grd;
  context.fill();

  //context.moveTo(0,0);
  //context.lineTo(200,100);
  //context.stroke();

  //context.fillStyle = "#FAFAFA";
  var grd = context.createLinearGradient(0,0,canvas.width, canvas.height)
  grd.addColorStop(0, '#6666FF');
  grd.addColorStop(1, '#000000');
  context.fillStyle = grd;
  context.font = "80px Impact";
  context.textAlign="right";
  context.fillText("B", canvas.width/2, canvas.height/2);

  context.textAlign="left";
  var grd = context.createLinearGradient(0,0,canvas.width, canvas.height)
  grd.addColorStop(0, '#FF5555');
  grd.addColorStop(1, '#000000');
  context.fillStyle = grd;
  context.fillText("G", canvas.width/2, canvas.height/2);


  //context.textAlign="left";
  var grd = context.createLinearGradient(0,0,canvas.width, canvas.height)
  grd.addColorStop(0, '#FF5555');
  grd.addColorStop(1, '#000000');
  context.fillStyle = grd;
  context.textAlign="center";
  context.font = "20px Impact";
  context.fillText("Universal Business Guide", canvas.width/2, canvas.height/2 + 25);
}

}
