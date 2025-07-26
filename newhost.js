const fs = require('fs');
const os = require('os');
const path = require('path');

const hostsEntry = '127.0.0.1   app.pdv.local';
const hostsPath = os.platform() === 'win32' ? path.join(process.env.SystemRoot, 'System32', 'drivers', 'etc', 'hosts') : 'etc/hosts';

let content = fs.readFileSync(hostsPath, 'utf8');

if (!content.includes('app.pdv.local')) {
    content += os.EOL + hostsEntry;
    try {
        fs.writeFileSync(hostsPath, content, { encoding: 'utf8' });
    } catch (err) {
        console.error('No se pudo escribir en el archivos hosts. Entra como administrador');
    }
} else {
    console.log('app.pdv.local ya existe');
}