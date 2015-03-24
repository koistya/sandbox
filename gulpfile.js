'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('minimist')(process.argv.slice(2));

// Load content from JSON files
var data = (function() {
  var fs = require('fs');
  var _ = require('lodash');

  var channelId = argv.channel || 'default';
  var channels = require('./data/channels.json');
  var channel = _.find(channels, function(_) {
     return _.id === channelId;
  });

  return {channel: channel};
}());

gulp.task('build', function() {
  return gulp.src('src/index.html')
    .pipe($.replace(
      '<!--settings-->',
      'var App = App || {};' +
      'App.channel = ' + JSON.stringify(data.channel) + ';'))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['build']);
