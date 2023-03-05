// const login = require("../models/login");
const signup = require("../models/signup");
const account = require("../models/accounts");
const transactions = require("../models/transactions");
const deploy = require("../scripts/deploy");
const deposit = require("../scripts/deposit");
const withdraw = require("../scripts/withdrawl");
const getbalance = require("../scripts/getBalance");
const ErrResponse = require("../utils/errResponse");
const nodemailer = require("nodemailer");
const qrcode = require("qrcode");
const path = require("path");
const fs = require("fs");

var user_init;

exports.signup_function = async (req, res) => {
    const {_name, phone_number, email, password, pincode, age} = req.body.userCredentials;
    console.log(req.body);

    const account_number = await deploy.main();

    const avatar = '/assets/images/face-6.jpg';

    const role = "client";

    console.log(account_number);

    try{
        const signed_up = await signup.create({
            account_number,
            avatar,
            _name,
            phone_number,
            email,
            password,
            pincode,
            age,
            role
        });

		const hash_id = "0x00000";
		const amount = 500;
		const timestamp = new Date().toString();
		const type = 'Deposit';

        const main_account = account_number;
        const account_created = await account.create({
			main_account,
        });

		const transaction_instance = await transactions.create({
			account_number,
			transaction:[{hash_id: hash_id, amount: amount, timestamp: timestamp, type: type}],
		});

        console.log(signed_up);
        console.log(account_created);
		    console.log(transaction_instance);
        res.status(201).json({
            ok: true,
            signed_up: signed_up,
            message: 'User created'
        });
        createqr(account_number);
        sendMail(account_number, email);
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Cannot create user'
        });
    }
};

exports.login_function = async (req, res, next) => {
    const {account_number, password} = req.body.userCredentials;
    console.log(req.body);

    if (!account_number || !password) {
        return next(new ErrResponse("Please provide an account number and password", 400));
    }

    try{
        const user = await signup.findOne({account_number: account_number}).select("+password");
        console.log(user);

        if(!user){
            return next(new ErrResponse("User not found", 401));
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            return next(new ErrResponse("Invalid Credentials", 401));
        }

      const balance = await getbalance.main(account_number);
      console.log(balance);

      user_init = {
        name: user._name,
        balance: balance,
        avatar: user.avatar,
      }

      res.status(201).json({
        accessToken: 201,
          user: {
            id: user.account_number,
            avatar: user.avatar,
            email: user.email,
            name: user._name,
            role: user.role,
            balance: balance,
          }
        });
      }   catch (error) {
          res.status(500).json({ success: false, error: error.message });
    }
};

exports.deposit_function = async (req, res, next) => {
	const {account_number, amount} = req.body.userCredentials;
	console.log(req.body);
	var today = new Date();

	const mss = await deposit.main(account_number, amount);
  console.log(mss);

	var DD = String(today.getDate()).padStart(2, '0');
	var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var YYYY = today.getFullYear();
	var hh = today.getHours();
	var mm = today.getMinutes();
	var ss = today.getSeconds();
	today = YYYY + " " + MM + " " + DD + " " + hh + " " + " " + mm + " " + ss;

	const date = new Date().toString();
	const doc = await transactions.findOne({account_number: account_number});
	
	doc.transaction.push({hash_id: mss.hash, amount: amount, timestamp: date, type: 'Deposit'});

	await doc.save();

  user_init.balance = mss.balance;

	res.status(201).json({
		accessToken: 201,
		user: {
      name: user_init.name,
      avatar: user_init.avatar,
			balance: mss.balance,
			id: account_number,
			amount: amount,
			hash: mss.hash,
			date: today,
      transac: doc.transaction,
			type: 'Deposit',
		}
	})
};

exports.withdrawl_function = async (req, res, next) => {
	const {account_number, amount} = req.body.userCredentials;
	console.log(account_number);

	var today = new Date();

	console.log(req.body);

	const mss = await withdraw.main(account_number, amount);
  	console.log(mss);

	var DD = String(today.getDate()).padStart(2, '0');
	var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var YYYY = today.getFullYear();
	var hh = today.getHours();
	var mm = today.getMinutes();
	var ss = today.getSeconds();
	today = YYYY + " " + MM + " " + DD + " " + hh + " " + " " + mm + " " + ss;

	const date = new Date().toString();
	const doc = await transactions.findOne({account_number: account_number});
	
	doc.transaction.push({hash_id: mss.hash, amount: amount, timestamp: date, type: 'Withdrawl'});

	await doc.save();

  user_init.balance = mss.balance;

	res.status(201).json({
		accessToken: 201, 
		user: {
      name: user_init.name,
      avatar: user_init.avatar,
			balance: mss.balance,
			id: account_number,
			amount: amount,
			hash: mss.hash,
			date: today,
      transac: doc.transaction,
			type: 'Withdrawl',
		}
	})
};

exports.get_balance_function = async(res, req, next) => {
	const {account_number} = req.body.userCredentials;
	console.log("Get balance controllers auth")
	console.log(res)

	const balance = await getbalance.main(account_number);
	console.log(balance);

	res.status(201).json({
		accessToken: 201,
		balance: balance,
		account_number: account_number,
	})
};

exports.get_transactions = async(req, res, next) => {
	const {account_number} = req.body.userCredentials;

	const doc = await transactions.findOne({account_number: account_number});

	console.log("transaction: " + doc.transaction);

  	const trans = doc.transaction;

	res.status(201).json({
    accessToken: 201, 
		user: {
      name: user_init.name,
      avatar: user_init.avatar,
      balance: user_init.balance,
			transac: trans,
			type: 'Transactions',
		}
  });
}

function createqr (account_number){
    qrcode.toFile(account_number + ".png", account_number);
    console.log("QR code generated");
};

function sendMail(account_number, email) {
    console.log(email);
    const reqpath = path.join(__dirname, "../");
    const qrcode = account_number + ".png";
    var transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "satvik.verma@iiitb.ac.in",
        pass: "SatvikVerma@0209",
      },
    });

    var mailOptions = {
      from: "satvik.verma@iiitb.ac.in",
      to: email,
      subject: "Your User ID",
      text: "Show the QR code to where ever account number is required.\nYour Account number is " + account_number,
      attachments: [
        {
          path: reqpath + qrcode,
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        try {
          fs.unlink(reqpath + qrcode, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Deleted qr code");
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
}