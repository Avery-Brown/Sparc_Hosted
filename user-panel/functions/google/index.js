const {google} = require('googleapis');
const http = require('http')
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

class GoogleClient {
    constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
            "563138554907-d9fa1om9948ds976s2d1rmkir9767irs.apps.googleusercontent.com", 
            "5h0--aqmz23Vqm_WV3DAxDOq", 
            "http://localhost:3333/oauth2callback/"
        );
    }

    async authenticate() {

        return new Promise((resolve, reject) => {
          // grab the url that will be used for authorization
          const authorizeUrl = this.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES.join(' '),
            prompt: 'select_account'
          });
          const server = http
            .createServer(async (req, res) => {
              try {
                if (req.url.indexOf('/oauth2callback') > -1) {
                  const qs = new url.URL(req.url, 'http://localhost:3333')
                    .searchParams;
                  res.end(
                    'Authentication successful! Please return to the console.'
                  );
                  server.destroy();
                  const {tokens} = await this.oAuth2Client.getToken(qs.get('code'));
                  console.log(tokens);
                  this.oAuth2Client.credentials = tokens;
                  resolve(this.oAuth2Client);
                }
              } catch (e) {
                reject(e);
              }
            })
            .listen(3333, () => {
              // open the browser to the authorize url to start the workflow
              opn(authorizeUrl, {wait: false}).then(cp => cp.unref());
            });
          destroyer(server);
        });
      }

}




/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}

module.exports = new GoogleClient();