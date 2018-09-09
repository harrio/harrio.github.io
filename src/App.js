import React, { Component } from "react";
import * as THREE from "three";
import "three/examples/js/loaders/GLTFLoader";
import "three/examples/js/controls/OrbitControls";
import "./App.css";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);
    this.controls = new THREE.OrbitControls(this.camera);

    this.camera.position.y = 5;
    this.camera.position.z = 0;
    this.controls.target = new THREE.Vector3(10, 0, -15);
    this.controls.update();

    this.scene.add(new THREE.GridHelper(100, 50));

    const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
    light.position.set(0, 5, 0);
    this.scene.add(light);

    const loader = new THREE.GLTFLoader();
    loader.load(
      "models/rak.glb",
      gltf => {
        console.log("GLTF loaded");
        this.scene.add(gltf.scene);
      },
      xhr => {
        console.log("Loading...");
      },
      error => {
        console.log("An error occurred", error);
      }
    );

    this.div.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.div.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frame) {
      this.frame = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frame);
  }

  animate() {
    this.frame = window.requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderScene();
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        ref={div => {
          this.div = div;
        }}
      />
    );
  }
}

export default App;
