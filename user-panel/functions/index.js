const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser')
const SENDGRID_API_KEY = functions.config().sendgrid.key
const Keys = require("./config/keys")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
const stripe = require("stripe")(Keys.stripe);
const cors = require('cors')({origin: true});
const {google} = require('googleapis')
const GoogleClient = require('./google/index')

admin.initializeApp();

const main = express();
const app = express();

const ContactRouter = require('./routes/contact');
const TransactRouter = require('./routes/transact');

let contactRouter = new ContactRouter();
let transactRouter = new TransactRouter();

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

app.use('/contact', contactRouter.router)
app.use('/transact', transactRouter.router);


exports.CheckoutSession = functions.https.onRequest((request, response) => {
    /**
     * CheckoutSession charges a user for a paid engagement
     */
  cors(request, response, () => {
    const token = request.body.stripeToken
    let amount = request.body.amount;

    stripe.customers.create({
      email: request.body.email,
      card: token.id
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
      }))
      .then(charge => response.send(charge))
      .catch(err => {
        console.log("Error:", err);
        response.status(500).send({error: "Purchase Failed"});
    });
  })
})



exports.sendMail = functions.https.onRequest((req, res) => {
    /**
     * Sends a confirmation email with engagement details to a user that siugns up for participating in an event
     */
  cors(req, res, () => {
    if(req.method == 'POST') {
          const dest = req.body.dest;
          const event = req.body.event;
          const end_time = req.body.end_time;
          const start_time = req.body.start_time;
          const date = req.body.date;
          const host_contact = req.body.host_contact;
          const event_address = req.body.event_address;
          const event_location_access = req.body.event_location_access;
          const event_space = req.body.event_space;
          sgMail.send({
              to: dest,
              from: 'info@sparc.world',
              subject: 'Sparc Engagement Confirmation',
              text: 'Participation Text',
              html: '<p>Your participation for ' + event +
              ' has been confirmed</p> <p>Here is information about the engagement: </p><p><strong>Date: </strong>' + date +
              '</p> <p><strong>Start Time: </strong>' + start_time +
              '</p> <p><strong>End Time: </strong>' + end_time +
              '</p> <p><strong>Host Contact Information: </strong>' + host_contact +
              '</p> <p><strong>Event Address: </strong>' + event_address +
              '</p> <p><strong>Event Access Information: </strong>' + event_location_access +
              '</p> <p><strong>Event Space:</strong>' + event_space +
              '</p> <p>Thanks for Participating,</p> <p>Sparc Team</p>',
              // html: 'Your Participation for ' + event + ' has been confirmed. Here is some information ' + host_contact + ' Thanks for participating! </strong>',
          }).then(res => res.send('Email Sent')).catch(err => res.send(err));
      }
      else {
          res.send("Error " + " " + SENDGRID_API_KEY)
      }
  });
});


exports.sendReminder = functions.https.onRequest((req, res) => {
    /**
     * @deprecated
     * sendReminder sends a reminder email to a user who will be attending an engagement in the future
     */
    cors(req, res, () => {
        if(req.method == 'POST') {
            const dest = req.body.dest;
            const event = req.body.event;
            const end_time = req.body.end_time;
            const start_time = req.body.start_time;
            const date = req.body.date;
            const host_contact = req.body.host_contact;
            const event_address = req.body.event_address;
            const event_location_access = req.body.event_location_access;
            const event_space = req.body.event_space;
            var sendDate = new Date(date + ' ' + start_time)
            sgMail.send({
                send_at: (sendDate.getTime() / 1000),
                to: dest,
                from: 'info@sparc.world',
                subject: 'Sparc Engagement Confirmation',
                text: 'Participation Text',
                html: '<p>Your reminder for ' + event +
                    '</p> <p>Here is information about the engagement: </p><p><strong>Date: </strong>' + date +
                    '</p> <p><strong>Start Time: </strong>' + start_time +
                    '</p> <p><strong>End Time: </strong>' + end_time +
                    '</p> <p><strong>Host Contact Information: </strong>' + host_contact +
                    '</p> <p><strong>Event Address: </strong>' + event_address +
                    '</p> <p><strong>Event Access Information: </strong>' + event_location_access +
                    '</p> <p><strong>Event Space:</strong>' + event_space +
                    '</p> <p>Thanks for Participating,</p> <p>Sparc Team</p>',
            }).then(res => res.send('Email Sent')).catch(err => res.send(err));
        }
        else {
            res.send("Error " + " " + SENDGRID_API_KEY)
        }
    });
});


exports.sendContact = functions.https.onRequest((req, res) => {
    /**
     * sendContact sends a verification email to a user after contacting the Sparc team
     */
  cors(req, res, () => {
    if(req.method == 'POST') {
      const name = req.body.name;
      const dest = req.body.dest;
      const message = req.body.message;
      sgMail.send({
        to: dest,
        from: 'info@sparc.world',
        subject: 'Contact Verification',
        text: 'Thank you, ' + name + ', for contacting us. We will get back to you shortly.'
      }).then(res => res.send('Email Sent to User')).catch(err => res.send(err));

      //Send info to sparc
      sgMail.send({
        to:'info@sparc.world',
        from: 'info@sparc.world',
        subject: 'Contact Request from ' + name,
        text: message
      }).then(res => res.send('Email Sent to Sparc')).catch(err => res.send(err));
    }
  })
})

exports.getEvents = functions.https.onRequest((req, res) => {
    /**
     * getEvents gets the engagements from the database
     */
  cors(req, res, () => {
    var eventsRef = admin.database().ref('events');
    eventsRef.on("value", (snapshot) => {
      console.log(snapshot.val());
      res.send(snapshot.val())
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  })
})

exports.getUsers = functions.https.onRequest((req, res) => {
    /**
     * getUsers gets the users for a certain event from the database
     */
  cors(req, res, () => {
    var usersRef = admin.database().ref('users');
    usersRef.on("value", (snapshot) => {
      console.log(snapshot.val());
      res.send(snapshot.val())
    })
  })
})

exports.getRatings = functions.https.onRequest((req, res) => {
    /**
     * getRatings gets the ratings of an event from the database
     */
  cors(req, res, () => {
    var ratingsRef = admin.database().ref('ratings');
    ratingsRef.on('value', (snapshot) => {
      res.send(snapshot.val());
    })
  })
})

exports.getTags = functions.https.onRequest((req, res) => {
    /**
     * getTags gets the tag from an event from the database
     */
  cors(req, res, () => {
    var tagsRef = admin.database().ref('tags');
    tagsRef.on('value', snapshot => {
      res.send(snapshot.val())
    })
  })
})

exports.checkUser = functions.https.onRequest((req, res) => {
    /**
     * Checks if a user already exists with a given email
     */
  cors(req, res, async () => {
    try {
      await admin.auth().getUserByEmail(req.body.email)
      res.status(400).send({"error": "User already exists with this email"})
    } catch (e) {
      res.status(200).send("GOOD TO GO")
    }
  })
})

exports.checkCalendarTest = functions.https.onRequest((req, res) => {
  GoogleClient.authenticate().then(() => {
    const calendar = google.calendar({version: 'v3', auth: GoogleClient.oAuth2Client});
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
  )

})

exports.webApi = functions.https.onRequest(main);
