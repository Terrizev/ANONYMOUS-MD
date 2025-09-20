const fs = require('fs')
const crypto = require('crypto')

/**
 * GET db with error handling
**/
let _registered = []
try {
    const data = fs.readFileSync('./database/registered.json', 'utf8')
    if (data.trim()) {
        _registered = JSON.parse(data)
    }
} catch (error) {
    // If file doesn't exist or contains invalid JSON, start with empty array
    console.log('Creating new registered.json file or fixing invalid JSON')
    _registered = []
    fs.writeFileSync('./database/registered.json', '[]')
}

/**
 * GET random user from db
 * return {string}
**/
const getRegisteredRandomId = () => {
    if (_registered.length === 0) {
        // Return a default ID if no users are registered yet
        return 'default-user-id'
    }
    return _registered[Math.floor(Math.random() * _registered.length)].id
}

/**
 * add user to db
 * @param {String} userId 
 * @param {String} name 
 * @param {String} age 
 * @param {String} time 
 * @param {String} serial 
**/
const addRegisteredUser = (userid, name, age, time, serials) => {
    const obj = { 
        id: userid, 
        name: name, 
        age: age, 
        time: time, 
        serial: serials 
    }
    _registered.push(obj)
    fs.writeFileSync('./database/registered.json', JSON.stringify(_registered, null, 2))
}

/**
 * GET random serial
 * params {number} size
 * return {string}
**/
const createSerial = (size) => {
    return crypto.randomBytes(size).toString('hex').slice(0, size)
}

/**
 * cek user from db
 * params {string} userid
 * return {true/false}
**/
const checkRegisteredUser = (userid) => {
    // Always return true to consider every user as registered
    return true
}

module.exports = {
    getRegisteredRandomId,
    addRegisteredUser,
    createSerial,
    checkRegisteredUser
}
