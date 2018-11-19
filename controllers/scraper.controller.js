const puppet = require('puppeteer');
const fs = require('fs');

let scrape = async (url = 'https://mika.house') => {
    const browser = await puppet.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: 'networkidle2'
    });
    
    const results = await page.$$eval('a', as => as.map(a => a.href));

    browser.close();

    return results.filter(link => link.indexOf('mika.house') !== -1);
}

module.exports = () => {
    let results = [];
    scrape().then(data => {
        data.forEach(d => results.push(d));
        scrape('https://mika.house/blog').then(data => {
            data.forEach(d => {
                if(!results.includes(d)){
                    results.push(d);
                }
            });
            fs.writeFile('sitemap.xml', sitemapBuilder(results), (err) => {
                if(err) return err;
                return true;     
            });
        });
    });
}

let sitemapBuilder = (links) => {
    var map = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    links.forEach(link => {
        map += '<url><loc>' + link +'</loc><priority>0.5</priority></url>\n';
    });

    map += '</urlset>';

    return map;
}