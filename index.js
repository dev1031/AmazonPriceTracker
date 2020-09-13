const puppeteer = require("puppeteer");
const $ = require("cheerio");
const CronJob = require("cron").CronJob;
const nodemailer = require("nodemailer");

const url = 'https://www.amazon.in/Apple-iPhone-11-64GB-Black/dp/B07XVMDRZY/';

async function configureBrowser(){
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);
    return page
}

async function checkPrice(page){
    await page.reload();
    let html = await page.evaluate(()=>document.body.innerHTML);
    //console.log(html);
    $('#priceblock_ourprice' , html).each(function(){
        let rupeePrice = $(this).text();
        console.log(rupeePrice);
        if(rupeePrice < 70000){
            console.log("Buy this item")
        }
    })
}

async function startTracking(){
    let page = await configureBrowser();
    var job = new CronJob('*/15 * * * * *', function() {
        checkPrice(page)
      }, null,true, null,null, true);
      job.start();
}

startTracking();

// async function monitor(){
//     let page = await configureBrowser();
//     await checkPrice(page)
// }

//monitor();