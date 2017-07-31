import otplib from 'otplib';
const {
  Device,
  User,
  Session
} = require('./db')


function verify(devices, otp) {

  devices.array.forEach(function (element) {
    const isValid = otplib.authenticator.check(otp, element.secret);

  }, this);

  return isValid
}


let devices = await Device.find({})
Console.log('hi there')
console.log(verify(devices, otp))
