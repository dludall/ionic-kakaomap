import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Platform } from '@ionic/angular';

declare let kakao: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  map: any;

  chickenData:any={};

  constructor(private platform: Platform,
    ) {}
  async ngOnInit() {    
    await fetch("assets/chicken.json").then(res=> res.json()).then(json=>{
      this.chickenData = json;
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
    

    // 마커 클러스터러를 생성합니다 
    var clusterer = new kakao.maps.MarkerClusterer({
      map: this.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 10 // 클러스터 할 최소 지도 레벨 
    });

    var markers = this.chickenData.positions.map((position: any)=>{
      console.log(position);
      return new kakao.maps.Marker({
              position : new kakao.maps.LatLng(position.lat, position.lng)
          });
    });
  //   console.log(markers.length);
  // // // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);

  }

}
