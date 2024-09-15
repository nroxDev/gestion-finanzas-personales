const crypto = require('crypto');

const secretKey = crypto.createHash('sha256').update(String('mi_clave_secreta')).digest('base64').substr(0, 32); 
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

function encriptar(texto) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encriptado = cipher.update(texto, 'utf8', 'hex');
    encriptado += cipher.final('hex');
    return `${iv.toString('hex')}:${encriptado}`;
}

function desencriptar(textoEncriptado) {
    const [ivHex, datosEncriptados] = textoEncriptado.split(':');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivHex, 'hex'));
    let desencriptado = decipher.update(datosEncriptados, 'hex', 'utf8');
    desencriptado += decipher.final('utf8');
    return desencriptado;
}

module.exports = {
    encriptar,
    desencriptar
}