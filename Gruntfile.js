/**
 * Created by ivan on 10/28/14.
 */
module.exports = function (grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodewebkit: {
            options: {
                appName: 'Frosch',
                platforms: ['win', 'osx64', 'linux64', 'linux32'],
                version: '0.12.2',
                dontMerge: true,
                buildDir: './bin' // Where the build version of my node-webkit app is saved
            },
            src: [
                './main.html',
                './package.json',
                './README.md',
                './LICENSE',
                './assets/fonts/**/*',
                './assets/img/**/*',
                './assets/lang/**/*',
                './assets/sounds/**/*',
                './assets/videos/LEAME.txt',

                './components/jquery/dist/jquery.js',
                './components/less/dist/less.js',
                './components/angular/angular.js',
                './components/angular-translate/angular-translate.js',
                './components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                './components/angular-ui-router/release/angular-ui-router.js',
                './components/angular-hotkeys/build/hotkeys.js',
                './components/angular-sanitize/angular-sanitize.js',
                './components/videogular/videogular.js',

                './components/frosch/frosch.min.js',

                './config/**/*',
                './css/**/*',
                './html/**/*',
                './js/**/*'
            ] // Your node-webkit app
        }
    });

    grunt.task.loadTasks('./tasks');

};