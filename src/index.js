'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
var Transitionable = require('famous/transitions/Transitionable');
var Mesh = require('famous/webgl-renderables/Mesh');
var Color = require('famous/utilities/Color');
var PointLight = require('famous/webgl-renderables/lights/PointLight');
var AmbientLight = require('famous/webgl-renderables/lights/AmbientLight');
var Material = require('famous/webgl-materials/Material');
var Camera = require('famous/components/Camera');
var SizeSystem = require('famous/core/SizeSystem');

// Boilerplate code to make your life easier
FamousEngine.init();

// Initialize with a scene; then, add a 'node' to the scene root
var scene = FamousEngine.createScene();

/*var sizesystem = new SizeSystem();
sizesystem.registerSizeAtPath(scene,250);
*/
var cameranode = scene.addChild();
var camera = new Camera(cameranode);
camera.setFrustum(200,220);

//Light/Sun
var lightnode = scene.addChild();
var light = new PointLight(lightnode);
light.setColor(new Color('white'));


lightnode.setSizeMode('absolute', 'absolute', 'absolute')
    .setPosition(1000,100,1000)
    .setAbsoluteSize(500, 500, 500)
    .setMountPoint(0.5, 0.5, 0.5)
    .setOrigin(0.5, 0.5, 0.5);


var Planet = function (x, y, z, size, period, textureDirectory) {
    this.node = scene.addChild();
    this.id = this.node.addComponent(this);
    this.mesh = new Mesh(this.node);
    this.texture = Material.Texture(textureDirectory);
    this.period = period;
    this.rotationpos = new Transitionable(0);

    this.mesh.setGeometry('Sphere',{detail: 100,});
    this.mesh.setBaseColor(this.texture);

    this.node.setSizeMode('absolute', 'absolute', 'absolute')    
        .setAbsoluteSize(size, size, size)
        .setPosition(x, y, z)
        .setMountPoint(0.5, 0.5, 0.5)
        .setOrigin(0.5, 0.5, 0.5);

    this.node.requestUpdate(this.id);
    
};

Planet.prototype.onUpdate = function onUpdate (time) {
    if(Math.floor(time) % this.period < 20){
        this.rotationpos.set(0);
        this.rotationpos.set(6.28, {duration: this.period, curve: 'linear'});
    }
    this.node.setRotation(0,this.rotationpos.get(), 0);
    this.node.requestUpdateOnNextTick(this.id);

}

Planet.prototype.GetBig = function () {
    this.node.setAbsoluteSize(200,200,200);
}

var earth = new Planet(400,400,0,50,4000, new Color('red'));
var mars = new Planet(500,400,0,40,4000)
var venus = new Planet(600,400,-100,200,-4000)
var jupiter = new Planet(700,400,0,20,4000)
var yomama = new Planet(800,400,0,10,4000)
var kungpowchicken = new Planet(900,400,0,90,4000)
var ckens = new Planet(1000,400,0,110,4000)



