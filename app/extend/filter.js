'use strict';

const moment = require('moment');

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
exports.formatTime = time => moment(time).format("YYYY-MM-DD HH:mm:ss");

exports.domain = url => url && url.split('/')[2];
