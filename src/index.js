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

//Light Constructor
var Light = function (x, y, z, color) {
	this.lightnode = scene.addChild();
	this.lightmesh = new Mesh(this.lightnode);
	this.light = new PointLight(this.lightnode);
	this.light.setColor(new Color(color));

	this.lightnode.setSizeMode('absolute', 'absolute', 'absolute')
    	.setPosition(x,y,z)
    	.setAbsoluteSize(1, 1, 1)
    	.setMountPoint(0.5, 0.5, 0.5)
    	.setOrigin(0.5, 0.5, 0.5);
}

var light1 = new Light (200,400,400,'white')
//var light2 = new Light (0,400,400,'lightgrey')
//var light3 = new Light (0,200,0,'grey')
//var light4 = new Light (0,600,0,'white')

//Planet Constructor
var Planet = function (x, y, z, size, rperiod, operiod, textureDirectory) {
    this.orbitor = scene.addChild();
    this.node = this.orbitor.addChild();
    this.rid = this.orbitor.addComponent(this);
    this.id = this.node.addComponent(this);
    this.mesh = new Mesh(this.node);
    this.texture = new Material.Texture(textureDirectory);
    this.rperiod = rperiod;
    this.rotationpos = new Transitionable(0);
    this.operiod = operiod;
    this.orbitpos = new Transitionable(0);

    this.mesh.setGeometry('Sphere',{detail: 100,});
    this.mesh.setBaseColor(this.texture);

    this.node.setSizeMode('absolute', 'absolute', 'absolute')    
        .setAbsoluteSize(size, size, size)
        .setPosition(x, y, z)
        .setMountPoint(0.5, 0.5, 0.5)
        .setOrigin(0.5, 0.5, 0.5);

    this.orbitor.setSizeMode('absolute','absolute','absolute')
    	.setAbsoluteSize(1,1,1)
    	.setPosition(0,0,0)
    	.setMountPoint(0.5,0.5,0.5)
    	.setOrigin(0.5,0.5,0.5);

    this.node.requestUpdate(this.id);   
};

Planet.prototype.onUpdate = function onUpdate (time) {
    //rotator
    if(Math.floor(time) % this.rperiod < 20){
        this.rotationpos.set(0);
        this.rotationpos.set(6.28, {duration: this.rperiod, curve: 'linear'});
    }
    this.orbitor.setRotation(0,this.orbitpos.get(), 0);

    //orbitor
    if(Math.floor(time) % this.operiod < 20){
        this.orbitpos.set(0);
        this.orbitpos.set(6.28, {duration: this.operiod, curve: 'linear'});
    }
    this.node.setRotation(0,this.rotationpos.get(), 0);
    this.node.requestUpdateOnNextTick(this.id);
}

var time1 = 10
var time2 = 10

var sunny = new Planet(0,400,0,300,600*time1,0,'/images/sun.jpg')
var mercury = new Planet(200,400,0,40,1408*time1,88*time2,'/images/mercury.jpg')
var venus = new Planet(300,400,0,48,2802*time1,225*time2,'/images/venus.jpg')
var earth = new Planet(400,400,0,52,25*time1,364*time2,'/images/earth.jpg')
var mars = new Planet(500,400,0,44,24*time1,687*time2,'/images/mars.jpg')
var jupiter = new Planet(700,400,0,200,10*time1,4380*time2,'/images/jupiter.jpg')
var saturn = new Planet(950,400,0,180,11*time1,10585*time2,'/images/saturn.jpg')
var uranus = new Planet(1200,400,0,160,17*time1,30660*time2,'/images/uranus.jpg')
var nepturn = new Planet(1450,400,0,160,16*time1,60225*time2,'/images/neptune.jpg')

//Camera (WIP) (VERY EXPERIMENTAL)








