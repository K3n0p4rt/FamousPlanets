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
    .setAlign(0.5, 0.5, 0.5)
    // Set the translational origin to the center of the 'node'
    .setMountPoint(0.5, 0.5, 0.5)
    // Set the rotational origin to the center of the 'node'
    .setOrigin(0.5, 0.5, 0.5);


var period = 4000;
var rotationpos = new Transitionable(0);
rotationpos.set(6.28, {duration: period});

var planetConstructor = function (x, y, z, ) {
    var meshnodeEarth = scene.addChild();
var mesh = new Mesh(meshnodeEarth);
var texture = Material.Texture('/images/earth.jpg');

mesh.setGeometry('Torus',{detail: 100,});
mesh.setBaseColor(new Color('red'));

meshnodeEarth.setSizeMode('absolute', 'absolute', 'absolute')    
    .setAbsoluteSize(50, 50, 50)
    // Center the 'node' to the parent (the screen, in this instance)
    .setAlign(0.5, 0.5, -6)
    // Set the translational origin to the center of the 'node'
    .setMountPoint(0.5, 0.5, 0.5)
    // Set the rotational origin to the center of the 'node'
    .setOrigin(0.5, 0.5, 0.5);



// Add a spinner component to the logo 'node' that is called, every frame
var spinner = meshnodeEarth.addComponent({
    onUpdate: function(time) {
        if(Math.floor(time) % period < 20){
            rotationpos.set(0);
            rotationpos.set(6.28, {duration: period, curve: 'linear'});
        }
        meshnodeEarth.setRotation(0,rotationpos.get(), 0);
        meshnodeEarth.requestUpdateOnNextTick(spinner);
    }
});

meshnodeEarth.requestUpdate(spinner);
};

// Earth
var meshnodeEarth = scene.addChild();
var mesh = new Mesh(meshnodeEarth);
var texture = Material.Texture('/images/earth.jpg');

mesh.setGeometry('Torus',{detail: 100,});
mesh.setBaseColor(new Color('red'));

meshnodeEarth.setSizeMode('absolute', 'absolute', 'absolute')    
    .setAbsoluteSize(50, 50, 50)
    // Center the 'node' to the parent (the screen, in this instance)
    .setAlign(0.5, 0.5, -6)
    // Set the translational origin to the center of the 'node'
    .setMountPoint(0.5, 0.5, 0.5)
    // Set the rotational origin to the center of the 'node'
    .setOrigin(0.5, 0.5, 0.5);



// Add a spinner component to the logo 'node' that is called, every frame
var spinner = meshnodeEarth.addComponent({
    onUpdate: function(time) {
    	if(Math.floor(time) % period < 20){
    		rotationpos.set(0);
    		rotationpos.set(6.28, {duration: period, curve: 'linear'});
    	}
        meshnodeEarth.setRotation(0,rotationpos.get(), 0);
        meshnodeEarth.requestUpdateOnNextTick(spinner);
    }
});

meshnodeEarth.requestUpdate(spinner);

//MARS
var meshnodeMars = scene.addChild();
var textureMars = Material.Texture('/images/earth.jpg');

var mesh1 = new Mesh(meshnodeMars);

mesh1.setGeometry('Torus',{detail: 100,});
mesh1.setBaseColor(textureMars);


meshnodeMars.setSizeMode('absolute', 'absolute', 'absolute')    
    .setAbsoluteSize(50, 50, 50)
    .setAlign(0.1, 0.5, -6)
    .setMountPoint(0.5, 0.5, 0.5)
    .setOrigin(0.5, 0.5, 0.5);

var period1 = 4000;
var rotationpos1 = new Transitionable(0);
rotationpos1.set(6.28, {duration: period1});

var spinner1 = meshnodeMars.addComponent({
    onUpdate: function(time) {
        if(Math.floor(time) % period1 < 20){
            rotationpos1.set(0);
            rotationpos1.set(6.28, {duration: period1, curve: 'linear'});
        }
        meshnodeMars.setRotation(0, rotationpos1.get() , 0);
        meshnodeMars.requestUpdateOnNextTick(spinner1);
    }
});

meshnodeMars.requestUpdate(spinner1);

//Jupiter

var meshnodeJupiter = scene.addChild();
var textureJupiter = Material.Texture('/images/earth.jpg');

var mesh2 = new Mesh(meshnodeJupiter);

mesh2.setGeometry('Torus',{detail: 100,});
mesh2.setBaseColor(textureJupiter);


meshnodeJupiter.setSizeMode('absolute', 'absolute', 'absolute')    
    .setAbsoluteSize(50, 50, 50)
    .setAlign(0.9, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5)
    .setOrigin(0.5, 0.5, 0.5);

var period2 = 4000;
var rotationpos2 = new Transitionable(0);
rotationpos2.set(6.28, {duration: period1});

var spinner2 = meshnodeJupiter.addComponent({
    onUpdate: function(time) {
        if(Math.floor(time) % period1 < 20){
            rotationpos2.set(0);
            rotationpos2.set(6.28, {duration: period1, curve: 'linear'});
        }
        meshnodeJupiter.setRotation(0, rotationpos2.get() , 0);
        meshnodeJupiter.requestUpdateOnNextTick(spinner2);
    }
});

meshnodeJupiter.requestUpdate(spinner2);

//Saturn

var meshnodeSaturn = scene.addChild();
var textureSaturn = Material.Texture('/images/earth.jpg');

var meshSaturn = new Mesh(meshnodeSaturn);

meshSaturn.setGeometry('Torus',{detail: 100,});
meshSaturn.setBaseColor(textureSaturn);


meshnodeSaturn.setSizeMode('absolute', 'absolute', 'absolute')    
    .setAbsoluteSize(50, 50, 50)
    .setAlign(0.7, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5)
    .setOrigin(0.5, 0.5, 0.5);

var periodSaturn = 4000;
var rotationposSaturn = new Transitionable(0);
rotationposSaturn.set(6.28, {duration: periodSaturn});

var spinnerSaturn = meshnodeSaturn.addComponent({
    onUpdate: function(time) {
        if(Math.floor(time) % period1 < 20){
            rotationposSaturn.set(0);
            rotationposSaturn.set(6.28, {duration: period1, curve: 'linear'});
        }
        meshnodeSaturn.setRotation(0, rotationposSaturn.get() , 0);
        meshnodeSaturn.requestUpdateOnNextTick(spinnerSaturn);
    }
});

meshnodeSaturn.requestUpdate(spinnerSaturn); 

//Venus

var meshnodeVenus = scene.addChild();
var textureVenus = Material.Texture('/images/earth.jpg');

var meshVenus = new Mesh(meshnodeVenus);

meshVenus.setGeometry('Torus',{detail: 100,});
meshVenus.setBaseColor(textureVenus);


meshnodeVenus.setSizeMode('absolute', 'absolute', 'absolute')    
    .setAbsoluteSize(50, 50, 50)
    .setAlign(0.3, 0.5, 0.5)
    .setMountPoint(0.5, 0.5, 0.5)
    .setOrigin(0.5, 0.5, 0.5);

var periodVenus = 4000;
var rotationposVenus = new Transitionable(0);
rotationposVenus.set(6.28, {duration: periodVenus});

var spinnerVenus = meshnodeVenus.addComponent({
    onUpdate: function(time) {
        if(Math.floor(time) % period1 < 20){
            rotationposVenus.set(0);
            rotationposVenus.set(6.28, {duration: period1, curve: 'linear'});
        }
        meshnodeVenus.setRotation(0, rotationposVenus.get() , 0);
        meshnodeVenus.requestUpdateOnNextTick(spinnerVenus);
    }
});

meshnodeVenus.requestUpdate(spinnerVenus);