import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import assets from '../assets/AgoraPlane.glb'

import BabylonScene from './Scene';
import { SceneEventArgs } from './Scene';

var count = 1;
const Viewer = (props) => {
  return (
    <div>
      <ViewerPage />
    </div>
  );
}

class ViewerPage extends Component {

  constructor(props) {
    super(props);

    this.canvas = '';
    this.engine = '';
    this.scene = '';
    this.camera = '';
    this.light = '';
    this.state = {
      interactables: '',
    };
  }

   VideoUsers = 0;
   videoplanes = [];

  onSceneMount = (e) => {
    const { canvas, scene, engine } = e;

    this.canvas = canvas;
    this.engine = engine;
    this.scene = scene;

    this.setupCamera();
    this.setupLights();
    this.setupStudio();
    // this.addObservable();
    this.scene.debugLayer.show();

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  }

  setupCamera = () => {
    this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -30), this.scene);
    this.camera.setTarget(BABYLON.Vector3.Zero());
    this.camera.attachControl(this.canvas, true);
    this.camera.rotation = new BABYLON.Vector3(0, 0, 0);
    // this.camera.inputs.remove(this.camera.inputs.attached.keyboard)
  }

  setupLights = () => {
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
    light.intensity = 0.7;
  }

  setupStudio = () => {
    const loadingCalc = (data) => {
      const { loaded } = data;
      const sceneLoadedPercent = ((loaded * 100) / 68633834).toFixed();
      const showLoading = !(sceneLoadedPercent === '100');
      this.setState(prevState => ({ ...prevState, sceneLoadedPercent, showLoading }));

    }
    BABYLON.SceneLoader.ImportMeshAsync('',
      assets, '', this.scene, loadingCalc)
      .then((studio) => {
        this.scene.materials.forEach((mat) => mat.unlit = true);
        const { meshes } = studio;
        meshes[0].rotation = new BABYLON.Vector3(0,270 * Math.PI/180,90 * Math.PI/180);

      });
  }

  videElement = "remote_video_";

  userid = localStorage.getItem(`${count}`);
  // console.log(uid)
  userid = localStorage.getItem('')
  
  addUser = (userid, videElement) =>{
    count++;
    console.log(userid)
    const ap = this.scene.getMeshByName("AgoraPlane");
    const ps = ap.getBoundingInfo().boundingBox.extendSizeWorld;
    videElement.setAttribute('webkit-playsinline', 'webkit-playsinline');
    videElement.setAttribute('playsinline', 'playsinline');
    this.addVideoToScreen(videElement, userid, ap, ps);
    document.querySelector('canvas').appendChild(videElement);
  };

  addVideoToScreen = (videoElement,userid,agoraPlane,planeSize) =>{
    this.VideoUsers++;
    if(this.VideoUsers === 1){
        const plane = BABYLON.MeshBuilder.CreatePlane(userid,{width: 1, height: 1}, this.scene);
        plane.scaling = new BABYLON.Vector3((planeSize._z * 2),(planeSize._x * 2),1);
        plane.position = new BABYLON.Vector3(agoraPlane.position.x,agoraPlane.position.y,-0.1);
        const VideoTex = new BABYLON.VideoTexture(userid, videoElement, this.scene,true,false,BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,{ loop: true, autoPlay: true, autoUpdateTexture: true });
        plane.material = new BABYLON.StandardMaterial(userid,this.scene);
        plane.material.emissiveTexture = VideoTex;
        videoElement.srcObject = videoElement.srcObject;
        this.videoplanes.push(plane);
        videoElement.onloadedmetadata = () => {
        console.log("finally playing");
        videoElement.play();
        }
      }
      
      
      if(this.VideoUsers === 2){
        this.videoplanes[0].scaling = new BABYLON.Vector3((planeSize._z),(planeSize._x * 2),1);
        this.videoplanes[0].position = new BABYLON.Vector3(-planeSize._z/2,0,-0.1);

        const plane2 = BABYLON.MeshBuilder.CreatePlane(userid,{width: 1, height: 1}, this.scene);
        plane2.scaling = new BABYLON.Vector3((planeSize._z),(planeSize._x * 2),1);
        plane2.position = new BABYLON.Vector3(planeSize._z/2,0,-0.1);
        const VideoTex = new BABYLON.VideoTexture(userid, videoElement, this.scene,true,false,BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,{ loop: true, autoPlay: true, autoUpdateTexture: true });
        plane2.material = new BABYLON.StandardMaterial(userid,this.scene);
        plane2.material.emissiveTexture = VideoTex;
        videoElement.srcObject = videoElement.srcObject;
        this.videoplanes.push(plane2);
        videoElement.onloadedmetadata = () => {
        console.log("finally playing");
        videoElement.play();
      }
    }

    if(this.VideoUsers === 3){
      this.videoplanes[0].scaling = new BABYLON.Vector3((planeSize._z),(planeSize._x),1);
      this.videoplanes[0].position = new BABYLON.Vector3(-planeSize._z/2,planeSize._x/2,-0.1);
      this.videoplanes[1].scaling = new BABYLON.Vector3((planeSize._z),(planeSize._x),1);
      this.videoplanes[1].position = new BABYLON.Vector3(planeSize._z/2,planeSize._x/2,-0.1);

      const plane3 = BABYLON.MeshBuilder.CreatePlane(userid,{width: 1, height: 1}, this.scene);
      plane3.scaling = new BABYLON.Vector3((planeSize._z),(planeSize._x),1);
      plane3.position = new BABYLON.Vector3(0,-planeSize._x/2,-0.1);
      const VideoTex = new BABYLON.VideoTexture(userid, videoElement, this.scene,true,false,BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,{ loop: true, autoPlay: true, autoUpdateTexture: true });
      plane3.material = new BABYLON.StandardMaterial(userid,this.scene);
      plane3.material.emissiveTexture = VideoTex;
      videoElement.srcObject = videoElement.srcObject;
      this.videoplanes.push(plane3);
      videoElement.onloadedmetadata = () => {
      console.log("finally playing");
      videoElement.play();
      }
    }

    if(this.VideoUsers === 4){
      this.videoplanes[0].scaling = new BABYLON.Vector3((planeSize._z),(planeSize._x),1);
      this.videoplanes[0].position = new BABYLON.Vector3(-planeSize._z/2,planeSize._x/2,-0.1);
      this.videoplanes[1].scaling = new BABYLON.Vector3((planeSize._z),(planeSize._x),1);
      this.videoplanes[1].position = new BABYLON.Vector3(planeSize._z/2,planeSize._x/2,-0.1);
      this.videoplanes[2].scaling = new BABYLON.Vector3((planeSize._z),(planeSize._x),1);
      this.videoplanes[2].position = new BABYLON.Vector3(-planeSize._z/2,-planeSize._x/2,-0.1);

      const plane3 = BABYLON.MeshBuilder.CreatePlane(userid,{width: 1, height: 1}, this.scene);
      plane3.scaling = new BABYLON.Vector3((planeSize._z),(planeSize._x),1);
      plane3.position = new BABYLON.Vector3(planeSize._z/2,-planeSize._x/2,-0.1);
      const VideoTex = new BABYLON.VideoTexture(userid, videoElement, this.scene,true,false,BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,{ loop: true, autoPlay: true, autoUpdateTexture: true });
      plane3.material = new BABYLON.StandardMaterial(userid,this.scene);
      plane3.material.emissiveTexture = VideoTex;
      videoElement.srcObject = videoElement.srcObject;
      this.videoplanes.push(plane3);
      videoElement.onloadedmetadata = () => {
      console.log("finally playing");
      videoElement.play();
      }
    }

  };

  removeStream=(userid)=>{
    
  };

  render() {
    return (
      <>
        <BabylonScene onSceneMount={this.onSceneMount} />
      </>
    )
  }
}

export default Viewer;