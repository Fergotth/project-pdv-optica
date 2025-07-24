const puppeteer = require('puppeteer');
const fs = require('fs');

async function generatePDFTicket(htmlPath, outputPath, callback) {
    let browser;

    try {
        const html = fs.readFileSync(htmlPath, 'utf8');
        browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'networkidle0' });

        const height = await page.evaluate(() => {
            return document.body.scrollHeight;
        });

        await page.pdf({
            path: outputPath,
            printBackground: true,
            width: '80mm',
            height: `${height}px`,
            margin: { top: '3mm', bottom: '3mm', left: '3mm', right: '3mm' }
        });

        if (callback) callback(null, outputPath);
        console.log('✅ PDF generado en:', outputPath);
    } catch (err) {
        if (callback) callback(err, null);
        console.error('❌ Error al generar el PDF:', err);
    } finally {
        if (browser) await browser.close();

        // 🔄 Siempre intentar borrar el archivo HTML
        try {
            fs.unlinkSync(htmlPath);
            console.log('🗑️ Archivo HTML eliminado:', htmlPath);
        } catch (e) {
            console.warn('⚠️ No se pudo eliminar el archivo HTML:', e.message);
        }
    }
}

module.exports = { generatePDFTicket };