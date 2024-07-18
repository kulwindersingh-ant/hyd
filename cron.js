const axios = require("axios")

const dd = {
    id: '57eda0eb-fec7-4e90-aa26-fd7e720f9822',
    a: 'https://api-analytics.hydro.online/hydro-ping',
}

function generateSessionId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function main(s) {
    const h = {
        // authority: 'api-analytics.hydro.online',
        accept: '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'content-type': 'application/json',
        origin: "https://www.servicemanaged.com",
        referer: "https://www.servicemanaged.com/",
        'sec-ch-ua':
            '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    };
    const axiosConfig = {
        // proxy: {
        //   host: proxy.split(':')[1].substring(2), // Extracting the host from the proxy URL
        //   port: parseInt(proxy.split(':')[2]),
        // },
        headers: h,
    };

    axios
        .post(
            dd.a,
            {
                status: 1,
                tag_id: dd.id,
                session_id: s,
            },
            axiosConfig,
        )
        .then((response) => {

            response?.data !== 'success'
                ? console.log('Error : ' + s)
                : console.log('SS : ' + s);
        })
        .catch((error) => {
            console.error('Error fetching data:', error.message);
        });
}

// const s = generateSessionId()



let allInterval = []

function createUser(s) {
    const interval = setInterval(() => {
        main(s)
    }, 14 * 1000)

    allInterval.push(interval)

}

function makeItFool(count = 25) {
    for (let i = 0; i < count; i++) {
        createUser(generateSessionId())
    }
}


function processIt() {
    if (allInterval.length) {
        allInterval.forEach((i) => clearInterval(i))
        allInterval.length = 0;
    }
    makeItFool()

}




export default function handler(req, res) {
    processIt()
    setInterval(() => {
        processIt()
    }, 30 * 60 * 1000)

    res.status(200).end('Hello Cron!');
}