const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy');
const { Builder, By, until, Browser } = require('selenium-webdriver');

// Proxy Mesh url
const proxyUrl = 'http://in.proxymesh.com:31280';

// proxy details
// username: GodCoder696
// password: 6bqTTkUntW@@QsS

const options = new chrome.Options();
// options.addArguments(`--proxy-server=${proxyUrl}`);
options.addArguments('--headless'); 
options.addArguments('--disable-gpu'); 
options.addArguments('--no-sandbox'); 
options.addArguments('--disable-dev-shm-usage');

let driver;

async function twitterLogin(username, password){
    // Open a X.com login page
    await driver.get('https://x.com/i/flow/login');
    
    // let the page load
    await driver.wait(until.elementLocated(By.name('text')), 600000);

    //  find username/email field & set email
    const usernameInput = await driver.findElement(By.name('text'));
    await usernameInput.sendKeys(username);
    
    // click next
    const nextButton = await driver.wait(until.elementsLocated(By.css('button[type="button"]')),50000);
    await nextButton[3].click();

    // find password fill & fill it
    const passwordField = await driver.wait(
        until.elementLocated(By.name('password')), 
        10000
    );
    await passwordField.sendKeys(password);

    // find & hit the login button
    const loginButton = await driver.findElement(
        By.css('button[data-testid="LoginForm_Login_Button"]') 
    );
    await loginButton.click();

    // redirect to homepage
    await driver.wait(until.urlContains('/home'), 100000); 

    console.log('Login successful!');
}

async function getTrends(trendNumber){

    if(trendNumber<=0) return [];

    // Select Show more button in order to get more topics 
    const showMoreButton= await driver.wait(until.elementLocated(By.css('a[href="/explore/tabs/for-you"]')),50000);
    await showMoreButton.click();

    // fetch all the trends
    const trends= await driver.wait(until.elementsLocated(By.css('div[data-testid="trend"]')))

    const trendsText= [];

    for(let i=0;i<(trends.length && trendNumber);i++){
        const trend= trends[i];
        let text=await trend.getText();
        text= text.replaceAll("\n"," ");
        trendsText.push(text);
    }

    return trendsText;
}

async function scrape() {
    try {
        // initialize driver
        driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build()
        // driver = await new Builder().forBrowser(Browser.CHROME).build();

        // login into twitter/X
        await twitterLogin("lakshayy307@gmail.com", "Iw@ntF@@NG#01");
        
        // scrape trends
        const trendsList= getTrends(5);

        return trendsList;
    } catch (err) {
        console.error('Error:', err);
    }
}

module.exports={scrape}