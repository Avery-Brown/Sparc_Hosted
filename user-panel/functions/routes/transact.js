const express = require("express");
const stripe = require("stripe")("sk_test_vGhKOwerdYCzpTvvHi2nBUIk002Gt130RU");

class TransactRouter {
    constructor() {
        this.router = express.Router();
        this.router.post("/checkout-session");

        this.checkoutSession = this.checkoutSession.bind(this);
    }

    checkoutSession(req, res) {
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
    }
}

module.exports = TransactRouter;