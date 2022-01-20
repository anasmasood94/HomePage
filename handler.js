"use strict";
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { saveUserData, getUserData } = require("./helpers/index");

const body_parser = require("body-parser");
const cors = require("cors");

app.use(body_parser.json());
app.use(cors());

app.post("/sendVerificationCode", async (req, res) => {
  try {
    const { email, phone } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    await saveUserData(email, phone, verificationCode)

    if (email !== undefined) {
      //TODO: Send email with verification code to user
    } else if (phone !== undefined) {
      const client = require("twilio")(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      await client.messages.create({
        body: `Your verification code for HomePage is ${verificationCode}`,
        from: process.env.TWILIO_FROM_NUMBER,
        to: phone,
      });
    }

    res.status(200).json({ message: "Verification Sent" });
  } catch (error) {
    res.status(422).json({ message: "error" + error });
  }
});

app.post("/verfiyCode", (req, res) => {
  try {
    const { email, phone, code } = req.body;
    getUserData(email, phone, function (response) {
      if (response?.err || Object.entries(response?.data).length === 0) {
        res.status(422).json({ error: "No Data found" });
      } else {
        if (response?.data?.Item?.info.code === code){
          res.status(200).send("Code is valid");
        }
        else {
          res.status(422).send("Code is not valid")
        }
      }
    });
  } catch (error) {
    res.status(422).send("error" + error);
  }
});

module.exports.handler = serverless(app);
