import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

declare let kakao: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  map: any;
  
  constructor(private platform: Platform,) {}
  ngOnInit(): void {    
    this.platform.ready().then(async () => {
      console.log("##########platform.ready ");
    });
  }

  ionViewWillEnter(){
    console.log("##########ionViewWillEnter ");
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(36.80825, 127.8692), //지도의 중심좌표.
      level: 13, //지도의 레벨(확대, 축소 정도)
    };
    this.map =  new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }

}
