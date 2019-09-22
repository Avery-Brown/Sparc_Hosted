const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const SENDGRID_API_KEY = functions.config().sendgrid.key
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
const stripe = require("stripe")("sk_test_vGhKOwerdYCzpTvvHi2nBUIk002Gt130RU");
const cors = require('cors')({origin: true});
admin.initializeApp();

exports.CheckoutSession = functions.https.onRequest((request, response) => {
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
    cors(req, res, () => {
        if(req.method == 'POST') {
            const dest = req.body.dest;
            const event = req.body.event;
            sgMail.send({
                to: dest,
                from: 'info@sparc.world',
                subject: 'Participation Message',
                text: 'Participation Text',
                html: '<strong>Your Participation for ' + event + ' has been confirmed. Thanks for participating! </strong>',
            }).then(res => res.send('Email Sent')).catch(err => res.send(err));
        }
        else {
            res.send("Error " + " " + SENDGRID_API_KEY)
        }
    });    
});

