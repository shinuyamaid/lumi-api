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

// create proxy checker using https-proxy-agent
const { HttpsProxyAgent } = require('https-proxy-agent');
const fetch = require('node-fetch');

async function checkProxy(proxie) {

    try {
        const res = await fetch('http://ip-api.com/json', { agent: proxie });
        const json = await res.json();
        return json;
    } catch (e) {
        return e;
    }

}

// test the proxy checker
(async () => {

    const proxy = randomProxy().split(':');
    const proxie = new HttpsProxyAgent(`http://${proxy[2]}:${proxy[3]}@${proxy[0]}:${proxy[1]}`);

    const result = await checkProxy(proxie);
    console.log(result);

})();