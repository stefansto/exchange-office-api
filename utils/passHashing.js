const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);
const randomBytesAsync = promisify(randomBytes);

const getSalt = async (size = 16) => {
    return (await randomBytesAsync(size)).toString('hex');
}

const getHash = async (password, salt, keylen = 32) => {
    return (await scryptAsync(password, salt, keylen)).toString('hex');
}

const encodeKey = (hash, salt) => {
    return `${salt}:${hash}`;
}

const decodeKey = (key) => {
    const [salt, hash] = key.split(':');
    return { salt, hash };
}

const hashPassword = async (password) => {
    const salt = await getSalt();
    const hash = await getHash(password, salt);
    const key = encodeKey(hash, salt);
    return key;
}

const compareHash = async (password, key) => {
    const {salt, hash} = decodeKey(key);
    const newHash = await getHash(password, salt);
    return hash === newHash;
}

module.exports = {
    hashPassword:hashPassword,
    compareHash:compareHash
}