let express = require('express');
let axios = require('axios');

let app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*')
    res.append('Access-Control-Allow-Content-Type', '*')
    next()
})

app.get('/', (req, res) => {
    res.send('api server')
})

// 指数数据
app.get('/api/index/quote', async (req, res) => {
    let url = 'https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SH000001,SZ399001,SZ399006,SH000688,HKHSI,HKHSCEI,HKHSCCI,.DJI,.IXIC,.INX';
    let options = {
        headers: {
            "Cookie": "xq_a_token=385b836a045da45667afda72237fc969313f56f0; xqat=385b836a045da45667afda72237fc969313f56f0; xq_r_token=f04bf9be3f04ead615a88752d56293c4ae5eec0b; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYyMzgxMTc5NywiY3RtIjoxNjIyNDMxODk0NzU2LCJjaWQiOiJkOWQwbjRBWnVwIn0.n8eDSJHCCOv5wwLe__WpJuktlC7g8jZt528WMDRNWNApc77OukEMRyyEnUiiPsDT4uBCJyHHs9rwzWcXonhqlOvqL_bw3vQJL9YqEcv-FUExKB6JKbAhknl-B166WdNGG4_ZLrZ_bmnN94a2Te_6KWl7a1nP2VTXyqzT08NGtC5N1Ukaq6nuADtK0SWFVj0qKOV4hHz59jjtdg6JYq1BaiD5Jvo5V40Lih-rOZiDu4OKIyt_ZN1ZSbIlp0RMsxVJDo6Yn539Dk_ZBILMzEsuNPP-e9PsHhIPDKaWRcytrTiw2NpS7oz6nxwKjsMeRdhzKOnQD6a2oMaC2gI5fk9o2A; u=631622431950531; device_id=24700f9f1986800ab4fcc880530dd0ed; Hm_lvt_1db88642e346389874251b5a1eded6e3=1622431953; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1622431953"
        }
    }
    let result = await axios.get(url, options)
    res.json(result.data);
})

// 热股榜
app.get('/api/index/hotStock', async (req, res) => {
    // type 10全球 11美股 12沪深 13港股 
    let {type=12} = req.query
    let url = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=8&_type=${type}&type=${type}`;
    let options = {
        headers: {
            "Cookie": "xq_a_token=385b836a045da45667afda72237fc969313f56f0; xqat=385b836a045da45667afda72237fc969313f56f0; xq_r_token=f04bf9be3f04ead615a88752d56293c4ae5eec0b; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYyMzgxMTc5NywiY3RtIjoxNjIyNDMxODk0NzU2LCJjaWQiOiJkOWQwbjRBWnVwIn0.n8eDSJHCCOv5wwLe__WpJuktlC7g8jZt528WMDRNWNApc77OukEMRyyEnUiiPsDT4uBCJyHHs9rwzWcXonhqlOvqL_bw3vQJL9YqEcv-FUExKB6JKbAhknl-B166WdNGG4_ZLrZ_bmnN94a2Te_6KWl7a1nP2VTXyqzT08NGtC5N1Ukaq6nuADtK0SWFVj0qKOV4hHz59jjtdg6JYq1BaiD5Jvo5V40Lih-rOZiDu4OKIyt_ZN1ZSbIlp0RMsxVJDo6Yn539Dk_ZBILMzEsuNPP-e9PsHhIPDKaWRcytrTiw2NpS7oz6nxwKjsMeRdhzKOnQD6a2oMaC2gI5fk9o2A; u=631622431950531; device_id=24700f9f1986800ab4fcc880530dd0ed; Hm_lvt_1db88642e346389874251b5a1eded6e3=1622431953; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1622431953"
        }
    }
    let result = await axios.get(url, options)
    res.json(result.data);
})

// 股票新闻
app.get('/api/index/news', async (req, res) => {
    // type 1雪球热帖 2，7x24
    let {type=1, max_id=-1} = req.query
    let url = type === 1 ? `https://xueqiu.com/statuses/livenews/list.json?since_id=-1&max_id=${max_id}&count=15` : `https://xueqiu.com/statuses/livenews/list.json?since_id=-1&max_id=${max_id}&count=15`;
    let options = {
        headers: {
            "Cookie": "xq_a_token=385b836a045da45667afda72237fc969313f56f0; xqat=385b836a045da45667afda72237fc969313f56f0; xq_r_token=f04bf9be3f04ead615a88752d56293c4ae5eec0b; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYyMzgxMTc5NywiY3RtIjoxNjIyNDMxODk0NzU2LCJjaWQiOiJkOWQwbjRBWnVwIn0.n8eDSJHCCOv5wwLe__WpJuktlC7g8jZt528WMDRNWNApc77OukEMRyyEnUiiPsDT4uBCJyHHs9rwzWcXonhqlOvqL_bw3vQJL9YqEcv-FUExKB6JKbAhknl-B166WdNGG4_ZLrZ_bmnN94a2Te_6KWl7a1nP2VTXyqzT08NGtC5N1Ukaq6nuADtK0SWFVj0qKOV4hHz59jjtdg6JYq1BaiD5Jvo5V40Lih-rOZiDu4OKIyt_ZN1ZSbIlp0RMsxVJDo6Yn539Dk_ZBILMzEsuNPP-e9PsHhIPDKaWRcytrTiw2NpS7oz6nxwKjsMeRdhzKOnQD6a2oMaC2gI5fk9o2A; u=631622431950531; device_id=24700f9f1986800ab4fcc880530dd0ed; Hm_lvt_1db88642e346389874251b5a1eded6e3=1622431953; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1622431953"
        }
    }
    let result = await axios.get(url, options)
    res.json(result.data);
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('server start: ', port)
})