import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';
import { MatDialog } from '@angular/material/dialog';
import { AddMarkerDialogComponent } from '../add-marker-dialog/add-marker-dialog.component';
import { FormBuilder, FormGroup,  } from '@angular/forms';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  public map!: Map;  //map
  marker:any; //marker variable
  vectorSource: any;
  vectorLayer: any;
  Addmarker = Array()
  lonlat = Array(); //latitude and longitude array
  Location_data = Array(); //iterating over this array
  UpdateMapDataForm!: FormGroup;
  Id: any; //to update
  heading ="Location Manager" //for app-header-page
  subheading ="Click on Map to Insert data";



constructor(public fb:FormBuilder,public dialog: MatDialog){
 
}

  ngOnInit(): void {
    this.UpdateMapDataForm = this.fb.group({
      Name: [''],
      Description: [''],
      Latitude:['',],
      Longitude:['']
    });
    this.maps(); //default map loading
    
 }

 maps(){
  this.map = new Map({
    target: 'map',
    layers: [ new TileLayer({
      source: new OSM()
    })],
    view: new View({
      center: fromLonLat([2.896372, 44.60240]),
      zoom: 3
    })
  });
 }

 GetLatLon(event: any){
  //to get latitude and longitude 
  var coordinate = this.map.getEventCoordinate(event);
  this.lonlat = olProj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
  const dialogRef = this.dialog.open(AddMarkerDialogComponent, {
    disableClose: false,
    height: '40%',
    width: '30%',
    panelClass: 'my-class' 
  });
  dialogRef.afterClosed().subscribe((result: any) => {
    if(result != undefined){
      // adding marker if data exist
      this.AddMarker();
      var InsertedData = {
        latitude:this.lonlat[0],   
        longitude:this.lonlat[1],  
        name:result.Name,
        description:result.Description,
        id:this.Location_data.length + 1 //for identity
      }
      this.Location_data.push(InsertedData)
    }
  });
  
 
}

AddMarker(){
  //method to add marker
  this.marker = new Feature({
    geometry: new Point(fromLonLat(this.lonlat))
  });
  this.marker.setStyle(new Style({
    image: new Icon(({
      color: 'red',
      crossOrigin: 'anonymous',
      src: 'assets/reddot.png',
      imgSize: [20, 20]
    }))
  }));
 //pushing marker style to the addmarker 
  this.Addmarker.push(this.marker)
  this.vectorSource = new VectorSource({
    features: this.Addmarker
  });
  this.vectorLayer = new VectorLayer({
    source: this.vectorSource
  });
  //adding clicked place lon and lat to the map
  this.map.addLayer(this.vectorLayer)
}

UpdateDetails(){
  var Id = this.Id; //to check identity
var UpdateDetails =  this.Location_data.filter(function(data:any){
return data.id == Id
})
var Formvalue = this.UpdateMapDataForm.getRawValue();
Object.assign(UpdateDetails[0],{
  name:this.UpdateMapDataForm.value.Name,
  description:this.UpdateMapDataForm.value.Description,
  latitude:Formvalue.Latitude,
  longitude:Formvalue.Longitude
}
)
//resetting after updating the data
this.UpdateMapDataForm.reset()
}

EditDetails(item:any){
this.Id = item.id; //updating based on id
this.UpdateMapDataForm.get('Name')?.setValue(item.name)
this.UpdateMapDataForm.get('Description')?.setValue(item.description)
this.UpdateMapDataForm.controls['Latitude'].disable();
this.UpdateMapDataForm.get('Latitude')?.setValue(item.latitude);
this.UpdateMapDataForm.controls['Longitude'].disable();
this.UpdateMapDataForm.get('Longitude')?.setValue(item.longitude)
}

}
