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

// Initialize with a scene; then, add 'node' to the scene root
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
var light2 = new Light (2000,400,2000,'#222222')
var light3 = new Light (0,100,0,'#444444')
var light4 = new Light (0,700,0,'#444444')

//Planet Constructor
var Planet = function (x, y, z, size, rperiod, operiod, textureDirectory, infotexture) {
    this.orbitor = scene.addChild();
    this.node = this.orbitor.addChild();
    this.rid = this.orbitor.addComponent(this);
    this.id = this.node.addComponent(this);
    
    this.mesh = new Mesh(this.node);
    this.texture = new Material.Texture(textureDirectory);
   	//this.infosheettexture = new Material.Texture(infotexture);
    //this.node.infotexture = this.infosheettexture;

    this.rperiod = rperiod;
    this.rotationpos = new Transitionable(0);
    this.operiod = operiod;
    this.orbitpos = new Transitionable(0);
    
    //this.domElement = new DOMElement(this.node);
	//this.domElement.setAttribute('style', 'opacity: 0; background-color:#FFFFFF; PoportionalSize:0.5,0.5,0.5;');

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
    
    //this.node.position4 = this.node.getPosition() 
	//this.node.addUIEvent('click');
	//this.domElement.on('click', showInfo);
};

//
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



var time1 = 1000
var time2 = 10
var size1 = 0.6

var sunny = new Planet(0,400,0,300*size1,600*time1,0,'/images/sun.jpg','/images/doge.jpg')
var mercury = new Planet(200,400,0,40*size1,1408*time1,88*time2,'/images/mercury.jpg','/images/doge.jpg')
var venus = new Planet(300,400,0,48*size1,2802*time1,225*time2,'/images/venus.jpg','/images/doge.jpg')
var earth = new Planet(400,400,0,52*size1,25*time1,364*time2,'/images/earth.jpg','/images/doge.jpg')
var mars = new Planet(500,400,0,44*size1,24*time1,687*time2,'/images/mars.jpg','/images/doge.jpg')
var jupiter = new Planet(700,400,0,200*size1,10*time1,4380*time2,'/images/jupiter.jpg','/images/doge.jpg')
var saturn = new Planet(950,400,0,180*size1,11*time1,10585*time2,'/images/saturn.jpg','/images/doge.jpg')
var uranus = new Planet(1200,400,0,160*size1,17*time1,30660*time2,'/images/uranus.jpg','/images/doge.jpg')
var nepturn = new Planet(1450,400,0,160*size1,16*time1,60225*time2,'/images/neptune.jpg','/images/doge.jpg')

sunny.mesh.setFlatShading(true);


//Camera

var cameranode = scene.addChild();
var camera = new Camera(cameranode);
camera.setDepth(1000);
//cameranode.requestUpdate(camera);

//Satelite Constructor

var Satellite = function (planet,shape,xa,ya,za,size,size1,xo,yo,zo,textureDirectory) {
	this.satellite = planet.node.addChild();
	this.satellitemesh = new Mesh(this.satellite);
    this.satellitetexture = new Material.Texture(textureDirectory);
    this.sid = this.satellite.addComponent(this);
	
	this.satellitemesh.setGeometry(shape,{detail: 100,});
    this.satellitemesh.setBaseColor(this.satellitetexture);

    this.satellite.setSizeMode('absolute','absolute','absolute')
    	.setAbsoluteSize(size, size, size1)
        .setAlign(xa,ya,za)
        .setMountPoint(0.5, 0.5, 0.5)
        .setOrigin(xo,yo,zo);
	
	this.satellite.setRotation(1.7, 0, 0);
	
	this.satellite.requestUpdate(this.sid);
};

var saturnrings = new Satellite(saturn,'Torus',0.5,0.5,0.5,300*size1,10,0.5,0.5,0.5,'/images/saturnrings.jpg');
var moon = new Satellite(earth,'Sphere',0,0.5,0,20*size1,20*size1,0.5,0.5,0.5);1

function showInfo (e) {
	console.log('click');
	//console.log(e);//.node.getPosition().x);
	//cameranode.setPosition(e.node.position4[0],e.node.position4[1],e.node.position4[2]);
	//cameranode.setPosition(0,0,10);
	//console.log(cameranode.getPosition());
	//cameranode.requestUpdate(camera);

};


/*function showInfo (e) {
	console.log("click");
	console.log(e);

	var infonode = scene.addChild();
	var infomesh = new Mesh (infonode);

	infomesh.setGeometry('Box',{detail: 100});
	infomesh.setBaseColor(new Color('red'));
	infodomElement = new DOMElement(this.node);
    //infomesh.setBaseColor(new Material.Texture('/images/doge.jpg'));

	infonode.setProportionalSize(0.8, 0.8)
        .setPosition(800, 400)
        .setMountPoint(0.5, 0.5, 0.5)
        .setOrigin(0.5, 0.5, 0.5);

    infomesh.setFlatShading(true);
    this.domElement.setAttribute('style', 'opacity: 0; background-color:#FFFFFF; PoportionalSize:0.5,0.5,0.5;');
}
*/

