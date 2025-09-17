const fetch = require('node-fetch');
const cheerio = require('cheerio');
const FormData = require('form-data');

class LumiApp {

    constructor () {
        this.url = 'https://lumivoce.org';
    }

    async IDFetch (proxy) {

        try {

            const req = await fetch('https://m.stripe.com/6',
                {
                    agent: proxy,
                    method: 'POST',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
                        'Accept-Encoding': 'gzip, deflate, br, zstd',
                        'Content-Type': 'text/plain; text/plain;charset=UTF-8',
                        'origin': 'https://m.stripe.network',
                        'referer': 'https://m.stripe.network/',
                        'accept-language': 'en-US,en;q=0.9',
                        'priority': 'u=1, i'
                    },
                    body: 'JTdCJTIydjIlMjIlM0EyJTJDJTIyaWQlMjIlM0ElMjI0ZmEzYzVjOTdiNWFmNGIxZTg1ZWI3MGZjYmEzNzFmMCUyMiUyQyUyMnQlMjIlM0ExNiUyQyUyMnRhZyUyMiUzQSUyMiUyNG5wbV9wYWNrYWdlX3ZlcnNpb24lMjIlMkMlMjJzcmMlMjIlM0ElMjJqcyUyMiUyQyUyMmElMjIlM0ElN0IlMjJhJTIyJTNBJTdCJTIydiUyMiUzQSUyMnRydWUlMjIlMkMlMjJ0JTIyJTNBMCU3RCUyQyUyMmIlMjIlM0ElN0IlMjJ2JTIyJTNBJTIyZmFsc2UlMjIlMkMlMjJ0JTIyJTNBMCU3RCUyQyUyMmMlMjIlM0ElN0IlMjJ2JTIyJTNBJTIyZW4tVVMlMjIlMkMlMjJ0JTIyJTNBMCU3RCUyQyUyMmQlMjIlM0ElN0IlMjJ2JTIyJTNBJTIyV2luMzIlMjIlMkMlMjJ0JTIyJTNBMCU3RCUyQyUyMmUlMjIlM0ElN0IlMjJ2JTIyJTNBJTIyUERGJTIwVmlld2VyJTJDaW50ZXJuYWwtcGRmLXZpZXdlciUyQ2FwcGxpY2F0aW9uJTJGcGRmJTJDcGRmJTJCJTJCdGV4dCUyRnBkZiUyQ3BkZiUyQyUyMENocm9tZSUyMFBERiUyMFZpZXdlciUyQ2ludGVybmFsLXBkZi12aWV3ZXIlMkNhcHBsaWNhdGlvbiUyRnBkZiUyQ3BkZiUyQiUyQnRleHQlMkZwZGYlMkNwZGYlMkMlMjBDaHJvbWl1bSUyMFBERiUyMFZpZXdlciUyQ2ludGVybmFsLXBkZi12aWV3ZXIlMkNhcHBsaWNhdGlvbiUyRnBkZiUyQ3BkZiUyQiUyQnRleHQlMkZwZGYlMkNwZGYlMkMlMjBNaWNyb3NvZnQlMjBFZGdlJTIwUERGJTIwVmlld2VyJTJDaW50ZXJuYWwtcGRmLXZpZXdlciUyQ2FwcGxpY2F0aW9uJTJGcGRmJTJDcGRmJTJCJTJCdGV4dCUyRnBkZiUyQ3BkZiUyQyUyMFdlYktpdCUyMGJ1aWx0LWluJTIwUERGJTJDaW50ZXJuYWwtcGRmLXZpZXdlciUyQ2FwcGxpY2F0aW9uJTJGcGRmJTJDcGRmJTJCJTJCdGV4dCUyRnBkZiUyQ3BkZiUyMiUyQyUyMnQlMjIlM0EwJTdEJTJDJTIyZiUyMiUzQSU3QiUyMnYlMjIlM0ElMjIxMzY2d183MjhoXzI0ZF8xciUyMiUyQyUyMnQlMjIlM0EwJTdEJTJDJTIyZyUyMiUzQSU3QiUyMnYlMjIlM0ElMjI3JTIyJTJDJTIydCUyMiUzQTAlN0QlMkMlMjJoJTIyJTNBJTdCJTIydiUyMiUzQSUyMmZhbHNlJTIyJTJDJTIydCUyMiUzQTAlN0QlMkMlMjJpJTIyJTNBJTdCJTIydiUyMiUzQSUyMnNlc3Npb25TdG9yYWdlLWVuYWJsZWQlMkMlMjBsb2NhbFN0b3JhZ2UtZW5hYmxlZCUyMiUyQyUyMnQlMjIlM0E0JTdEJTJDJTIyaiUyMiUzQSU3QiUyMnYlMjIlM0ElMjIwMTAwMTAwMTAwMDExMDAwMTAwMTEwMTAxMTAwMDEwMTAxMDEwMDEwMDEwMTExMTEwMTExMTExJTIyJTJDJTIydCUyMiUzQTExJTdEJTJDJTIyayUyMiUzQSU3QiUyMnYlMjIlM0ElMjIlMjIlMkMlMjJ0JTIyJTNBMCU3RCUyQyUyMmwlMjIlM0ElN0IlMjJ2JTIyJTNBJTIyTW96aWxsYSUyRjUuMCUyMChXaW5kb3dzJTIwTlQlMjAxMC4wJTNCJTIwV2luNjQlM0IlMjB4NjQpJTIwQXBwbGVXZWJLaXQlMkY1MzcuMzYlMjAoS0hUTUwlMkMlMjBsaWtlJTIwR2Vja28pJTIwQ2hyb21lJTJGMTMzLjAuMC4wJTIwU2FmYXJpJTJGNTM3LjM2JTIyJTJDJTIydCUyMiUzQTAlN0QlMkMlMjJtJTIyJTNBJTdCJTIydiUyMiUzQSUyMiUyMiUyQyUyMnQlMjIlM0EwJTdEJTJDJTIybiUyMiUzQSU3QiUyMnYlMjIlM0ElMjJmYWxzZSUyMiUyQyUyMnQlMjIlM0ExMSU3RCUyQyUyMm8lMjIlM0ElN0IlMjJ2JTIyJTNBJTIyM2Q4NGYxZTZkODE5MzhiZjY1MDhjMjYyNjYzYzkyZWUlMjIlMkMlMjJ0JTIyJTNBMTAlN0QlN0QlMkMlMjJiJTIyJTNBJTdCJTIyYSUyMiUzQSUyMiUyMiUyQyUyMmIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRjNRLUplMUlDbFI3b25xNnlhOThDaDYyRXRZcEZWVVo4Y0h1R0hUOVJuUzAuX00wR3l3aDROZ0hKVFUxQWpQbGcwNFFHZVFuUXRvdmRxNG5TNkJUb2dRcyUyRl80R09iRjhEbnBKYkZBUVktNThaaHdtQmpBTTlVd1l2U0gtWUNmc203QmclMkYlMjIlMkMlMjJjJTIyJTNBJTIyb1haYllLdDIwdFFrQTZyNmZVYWZQdHNxekVRWFQ4WndsV0txY3FvcmhZWSUyMiUyQyUyMmQlMjIlM0ElMjJjOGM5N2M3ZS0yMzc1LTQ5ZTAtODhiNC1lNTVhYmFhN2RjMWE1M2VkZmElMjIlMkMlMjJlJTIyJTNBJTIyMzM4ZWQxOTItOTE3Ny00MjNhLTk3NDctNDExOTU0ZGNiNzhlOTYxMjU3JTIyJTJDJTIyZiUyMiUzQWZhbHNlJTJDJTIyZyUyMiUzQXRydWUlMkMlMjJoJTIyJTNBdHJ1ZSUyQyUyMmklMjIlM0ElNUIlMjJsb2NhdGlvbiUyMiU1RCUyQyUyMmolMjIlM0ElNUIlNUQlMkMlMjJuJTIyJTNBMzQ4JTJDJTIydSUyMiUzQSUyMmx1bWl2b2NlLm9yZyUyMiUyQyUyMnclMjIlM0ElMjIxNzQwMzgxMTYwNjAyJTNBNjliZmIwZGY5NWVjY2I1NmIzYzQzNzhiMjMxOTE1MzQ1YjM2ZWQ3OWM0MWY2MDE1YzlhZjY3ZDJkYmNmOGMzMCUyMiU3RCUyQyUyMmglMjIlM0ElMjI2OTlhNmRjMjk1YmM1MTEwZmViYSUyMiU3RA==',
                }
            );
            
            const res = await req.json();
            return res;

        } catch (e) {
            return e;
        }
    }

    async createPaymentMethod (proxy, ccn, exp_month, exp_year, cvc) {

        try {

            let id = await this.IDFetch();
            let time = Math.floor(Math.random() * 30) + 60 * 1000;

            const req = await fetch('https://api.stripe.com/v1/payment_methods',
                {
                    agent: proxy,
                    method: 'POST',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
                        'Accept': 'application/json',
                        'Accept-Encoding': 'gzip, deflate, br, zstd',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'origin': 'https://js.stripe.com',
                        'referer': 'https://js.stripe.com/',
                        'accept-language': 'en-US,en;q=0.9',
                        'priority': 'u=1, i'
                    },
                    body: 'type=card&card[number]='+ ccn +'&card[cvc]='+ cvc +'&card[exp_month]='+ exp_month +'&card[exp_year]='+ exp_year +'&guid='+ id.guid +'&muid='+ id.muid +'&sid='+ id.sid +'&referrer='+ encodeURIComponent(this.url) +'&time_on_page='+ time +'&key=pk_live_519sODGHwVm9HtpVbGWn3R5HrSXBaErzDUXPjtr2JvODEXgSV8x7UQnU3fChIZ6hlwrgM4ubVpp1DFbUDX74ft4pV00GlpMnrpR',
                }
            );

            const res = await req.json();
            return res;
            
        } catch (e) {
            return e;
        }
    }

    async createDonation (proxy, paymentId) {

        try {

            let time = new Date().getTime().toString();

            const form = new FormData();
            form.append('action', 'fluentform_submit');
            form.append('data', 'choose_time=One%20Time%20&payment_input=HK%20%24%20100&input_text=Julian%20Murphy&email=bojitherock%40outlook.com&payment_method=stripe&__fluent_form_embded_post_id=263&_fluentform_49_fluentformnonce=ecea34c310&_wp_http_referer=%2Fdonate%2F&__stripe_payment_method_id='+ paymentId +'&isFFConversational=true');
            form.append('form_id', '49');

            const response = await fetch(this.url + '/wp-admin/admin-ajax.php?t=' + time,
                {
                    agent: proxy,
                    method: 'POST',
                    headers: {
                        ...form.getHeaders(),
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
                        'Accept-Encoding': 'gzip, deflate, br, zstd',
                        'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
                        'origin': 'https://lumivoce.org',
                        'referer': 'https://lumivoce.org/donate/',
                        'accept-language': 'en-US,en;q=0.9',
                        'priority': 'u=1, i',
                        'Cookie': 'trp_language=en_US'
                    },
                    body: form
                }
            );

            const res = await response.json();
            return res;
            
        } catch (e) {
            return e;
        }
    }

}

module.exports = LumiApp;