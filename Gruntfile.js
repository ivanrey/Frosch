/**
 * Created by ivan on 10/28/14.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodewebkit: {
            options: {
                appName: 'Frosch',
                platforms: ['win'],
                buildDir: './bin' // Where the build version of my node-webkit app is saved
            },
            src: [
                './assets/**/*',
                './components/**/*',
                './config/**/*',
                './css/**/*',
                './html/**/*',
                './js/**/*'
            ] // Your node-webkit app
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');

};