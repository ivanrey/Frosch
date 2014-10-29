var NwBuilder = require('node-webkit-builder');
var Promise = require('node-webkit-builder/node_modules/bluebird');
var Utils = require('node-webkit-builder/lib/utils');
var path = require('path');
var _ = require('node-webkit-builder/node_modules/lodash');
var fs = require('fs');
var DecompressZip = require('decompress-zip');


//Sobrecarga del metodo de merge para capturar el zip
NwBuilder.prototype.mergeAppFiles = function () {
    var self = this,
        copiedFiles = [];

    this._forEachPlatform(function (name, platform) {
        // We copy the app files if we are on mac and don't force zip
        if (name === 'osx') {
            // no zip, copy the files
            if (!self.options.macZip) {
                self._files.forEach(function (file) {
                    var dest = path.resolve(platform.releasePath, self.options.appName + '.app', 'Contents', 'Resources', 'app.nw', file.dest);
                    copiedFiles.push(Utils.copyFile(file.src, dest));
                });
            } else {
                // zip just copy the app.nw
                copiedFiles.push(Utils.copyFile(self._nwFile, path.resolve(platform.releasePath, self.options.appName + '.app', 'Contents', 'Resources', 'nw.icns')));
            }
        } else {
            if (!self.options.dontMerge) {
                // We cat the app.nw file into the .exe / nw
                copiedFiles.push(Utils.mergeFiles(path.resolve(platform.releasePath, _.first(platform.files)), self._nwFile), platform.chmod);
            } else {
                copiedFiles.push(Utils.copyFile(self._nwFile, path.resolve(platform.releasePath, 'app.zip')));
            }
        }
    });
    return Promise.all(copiedFiles);
};

function toCamelcase(str) {
    return str.replace(/\_+([a-z])/g, function (x, chr) {
        return chr.toUpperCase();
    });
}

function addPlatform(opts, p) {
    var ps = opts['platforms'] = opts['platforms'] || [];
    if (ps.indexOf(p) === -1) ps.push(p);
}

module.exports = function (grunt) {

    grunt.registerMultiTask('nodewebkit', 'Packaging the current app as a node-webkit application', function () {
        var done = this.async(),
            options = this.options(),
            nwOptions = {};

        // Build out options for node-webkit-builder
        Object.keys(options).forEach(function (opt) {

            // maintain backward compatibility by supporting old platform style
            switch (opt) {
                case 'win':
                case 'osx':
                case 'linux32':
                case 'linux64':
                    if (!!options[opt]) {
                        addPlatform(nwOptions, opt);
                    }
                    break;

                case 'mac':
                    if (!!options[opt]) {
                        addPlatform(nwOptions, 'osx');
                    }
                    break;

                case 'timestamped_builds':
                    nwOptions['buildType'] = 'timestamped';
                    break;

                case 'credits':
                case 'zip':
                    nwOptions[toCamelcase('mac_' + opt)] = options[opt];
                    break;

                default:
                    // convert all other keys to camelcase style required by node-webkit-builder
                    nwOptions[toCamelcase(opt)] = options[opt];
            }

        });
        nwOptions.files = this.filesSrc;

        // create and run nwbuilder
        var nw = new NwBuilder(nwOptions);

        nw.on('log', function (log) {
            grunt.log.writeln(log);
        });

        nw.build().then(
            function (info) {
                if (nwOptions.dontMerge) {
                    grunt.log.ok('nodewebkit app extracting.');

                    var extracts = [];
                    nw._forEachPlatform(function (name, platform) {

                        var done = Promise.defer();
                        var app = path.resolve(platform.releasePath, 'app.zip');
                        var unzipper = new DecompressZip(app);

                        unzipper.on('error', function (err) {
                            done.reject(error);
                        });

                        unzipper.on('extract', function (log) {
                            console.log('removing ' + app);
                            fs.unlinkSync(app);
                            done.resolve();
                        });

                        unzipper.extract({
                            path: platform.releasePath
                        });

                        extracts.push(done.promise)
                    });
                    return Promise.all(extracts);
                }

            })
            .then(function () {
                grunt.log.ok('nodewebkit app created.');
                done();
            })
            .catch(function (err) {
                if (err) {
                    grunt.fail.fatal(err);
                    done();
                }

            });


    });

};