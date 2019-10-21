const express = require("express");
const functions = require('firebase-functions');
const SENDGRID_API_KEY = functions.config().sendgrid.key
const sgMail = require('@sendgrid/mail');
const cors = require('cors')({origin: true});


class ContactRouter {
    constructor() {
        sgMail.setApiKey(SENDGRID_API_KEY);
        this.router = express.Router();
        this.router.post("/send-contact", this.sendContact.bind(this));
        this.router.post("/send-mail", this.sendMail.bind(this));

        this.sendContact = this.sendContact.bind(this);
        this.sendMail = this.sendMail.bind(this);
    }

    sendContact(req, res) {
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
            } else {
                res.send("Error " + " " + SENDGRID_API_KEY)
            }
          })
    }

    sendMail(req, res) {
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
      };


}

module.exports = ContactRouter;