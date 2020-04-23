var fcm = require('fcm-notification');
var FCM = new fcm('symphonia.json');
var token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU4NzY3NjEyMywiZXhwIjoxNTg3Njc5NzIzLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1pOTNyN0BzeW1waG9uaWEtMjcyMjExLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstaTkzcjdAc3ltcGhvbmlhLTI3MjIxMS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6InNvbWUtdWlkIn0.YCjDbtM-HxTLw4Zc_SAtKsXzOhAjMdJ_dVd12mPOKqlfklofX_tZkm_zVS9DN5gjtVJDUdwsNE0wTE8EKdIWfijJCIQoI8ODgBBoIagDyRnUKm_IgUBiAWyh53MiwHgBjVt-4g2VSjS-5Q7DunqlCmPDFO0pfprPqzsuuA_6FOIp7EtbS6qUp3GKT4Dms2Sg3Wfia3HLARICAiiX002Haah0PKEDkxzRXwgiXNIE_8ZTfIVjDf9UKUOlpTxtF5yQBfAUzRPMTeH0mEfa32nWKjrDNP9LQPRzAoCXjQcp0A7IC4TGpuoxk0T9QYXSR572hBNCrZh6JYCbSAAkuu_QMA';

var message = {
  data: {
    //This is only optional, you can send any data
    score: '850',
    time: '2:45'
  },
  notification: {
    title: 'Title of notification',
    body: 'Body of notification'
  },
  token: token
};

FCM.send(message, function (err, response) {
  if (err) {
    console.log('error found', err);
  } else {
    console.log('response here', response);
  }
});
