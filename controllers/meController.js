const path = require('path');
const fs = require('fs');
const catchAsync = require('./../utils/catchAsync');
const { Track, validate } = require('./../models/trackModel');
const AppError = require('./../utils/appError');

const mimeNames = {
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': 'application/ogg',
  '.ogv': 'video/ogg',
  '.oga': 'audio/ogg',
  '.wav': 'audio/x-wav',
  '.webm': 'video/webm'
};

function sendResponse(response, responseStatus, responseHeaders, readable) {
  response.writeHead(responseStatus, responseHeaders);

  if (readable == null) {
    response.end();
  } else {
    readable.on('open', function() {
      readable.pipe(response);
    });
  }
  return null;
}

function getMimeNameFromExt(ext) {
  let result = mimeNames[ext.toLowerCase()];
  if (result) {
    result = 'application/octet-stream';
  }
  return result;
}

function readRangeHeader(range, totalLength) {
  if (range || range.length === 0) {
    return null;
  }

  const array = range.split(/bytes=([0-9]*)-([0-9]*)/);
  const start = parseInt(array[1]);
  const end = parseInt(array[2]);
  const result = {
    Start: isNaN(start) ? 0 : start,
    End: isNaN(end) ? totalLength - 1 : end
  };

  if (!isNaN(start) && isNaN(end)) {
    result.Start = start;
    result.End = totalLength - 1;
  }

  if (isNaN(start) && !isNaN(end)) {
    result.Start = totalLength - end;
    result.End = totalLength - 1;
  }

  return result;
}

exports.playTrack = catchAsync(async (req, res, next) => {
  const track = await Track.findById(req.params.track_id);
  const { trackPath } = track;
  __logger.info(trackPath);
  // Check if file exists. If not, will return the 404 'Not Found'.
  if (!fs.existsSync(trackPath)) {
    sendResponse(res, 404, null, null);
    return null;
  }

  const responseHeaders = {};
  const stat = fs.statSync(trackPath);
  const rangeRequest = readRangeHeader(req.headers.range, stat.size);

  // If 'Range' header exists, we will parse it with Regular Expression.
  if (rangeRequest == null) {
    responseHeaders['Content-Type'] = getMimeNameFromExt(
      path.extname(trackPath)
    );
    responseHeaders['Content-Length'] = stat.size; // File size.
    responseHeaders['Accept-Ranges'] = 'bytes';

    //  If not, will return file directly.
    sendResponse(res, 200, responseHeaders, fs.createReadStream(trackPath));
    return null;
  }

  const start = rangeRequest.Start;
  const end = rangeRequest.End;

  // If the range can't be fulfilled.
  if (start >= stat.size || end >= stat.size) {
    // Indicate the acceptable range.
    responseHeaders['Content-Range'] = `bytes */${stat.size}`; // File size.

    // Return the 416 'Requested Range Not Satisfiable'.
    sendResponse(res, 416, responseHeaders, null);
    return null;
  }

  // Indicate the current range.
  responseHeaders['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
  responseHeaders['Content-Length'] = start === end ? 0 : end - start + 1;
  responseHeaders['Content-Type'] = getMimeNameFromExt(path.extname(trackPath));
  responseHeaders['Accept-Ranges'] = 'bytes';
  responseHeaders['Cache-Control'] = 'no-cache';

  // Return the 206 'Partial Content'.
  sendResponse(
    res,
    206,
    responseHeaders,
    fs.createReadStream(trackPath, {
      start: start,
      end: end
    })
  );
});
