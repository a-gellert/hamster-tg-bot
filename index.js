const TelegramApi = require('node-telegram-bot-api');

const TELEGRAM_URI = '7501712919:AAFhhW0G6Yb-qjiRA-EaW43r3Jg6ZLZtS4I'

const EVENTS_DELAY = 20000;
const MAX_KEYS_PER_GAME_PER_DAY = 6;


// const port = process.env.PORT || 3000;

// const http = require('http');

// const server = http.createServer();
// server.listen(port);


let text = '';
let chatId = 1;
let gameChoice = 1;
let keyCount = 1;

const games = {
    1: {
        name: 'Riding Extreme 3D',
        appToken: 'd28721be-fd2d-4b45-869e-9f253b554e50',
        promoId: '43e35910-c168-4634-ad4f-52fd764a843f',
        eventsDelay: 22000,
        attemptsNumber: 22,
    },
    2: {
        name: 'Chain Cube 2048',
        appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
        promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
        eventsDelay: 20000,
        attemptsNumber: 10
    },
    3: {
        name: 'My Clone Army',
        appToken: '74ee0b5b-775e-4bee-974f-63e7f4d5bacb',
        promoId: 'fe693b26-b342-4159-8808-15e3ff7f8767',
        eventsDelay: 70000,
        attemptsNumber: 11,
    },
    4: {
        name: 'Train Miner',
        appToken: '82647f43-3f87-402d-88dd-09a90025313f',
        promoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954',
        eventsDelay: 20000,
        attemptsNumber: 10,
    },
    5: {
        name: 'MergeAway',
        appToken: '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
        promoId: 'dc128d28-c45b-411c-98ff-ac7726fbaea4',
        eventsDelay: 20000,
        attemptsNumber: 10,
    },
    6: {
        name: 'Twerk Race 3D',
        appToken: '61308365-9d16-4040-8bb0-2f4a4c69074c',
        promoId: '61308365-9d16-4040-8bb0-2f4a4c69074c',
        eventsDelay: 20000,
        attemptsNumber: 10,
    }
};

const bot = new TelegramApi(TELEGRAM_URI, { polling: true })
const gameSelectOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Riding Extreme 3D', callback_data: '001' }, { text: 'Chain Cube 2048', callback_data: '002' }],
            [{ text: 'My Clone Army', callback_data: '003' }, { text: 'Train Miner', callback_data: '004' }],
            [{ text: 'MergeAway', callback_data: '005' }, { text: 'Twerk Race 3D', callback_data: '006' }],
        ]
    })
}

const countOfKeys = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '1', callback_data: '1' }, { text: '2', callback_data: '2' }],
            [{ text: '3', callback_data: '3' }, { text: '4', callback_data: '4' }],
        ]
    })
}
const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Сгенерировать ещё', callback_data: '/again' }],
        ]
    })
}
bot.setMyCommands([
    { command: '/start', description: 'Приветсвие' },
    //  { command: '/testik', description: 'Отправка тестового запроса' }
])
let cl;
bot.on('message', async msg => {
    text = msg.text;
    chatId = msg.chat.id;
    if (text === '/start') {
        console.log(msg);
        await bot.sendMessage(chatId, 'Выберите игру', gameSelectOptions);
    }
    if (text === '1') {
        await bot.sendMessage(chatId, 'ride');
    }
    if (text === '/testik') {
        await bot.sendMessage(chatId, 'Тестируем');
        await cl.sendRequest()
    }
})

bot.on('callback_query', async msg => {
    const data = msg.data;
    chatId = msg.message.chat.id;

    let cl = new Client(msg.id)

    if (data === '/again') {
        console.log(msg);
        await bot.sendMessage(chatId, 'Выберите игру', gameSelectOptions);
    }


    if (data == '001') {
        await bot.sendMessage(chatId, `Riding Extreme 3D \nСколько ключей нужно?`, countOfKeys);
        gameChoice = 1;
    }
    else if (data == '002') {
        await bot.sendMessage(chatId, `Chain Cube 2048 \nСколько ключей нужно?`, countOfKeys);
        gameChoice = 2;
    }
    else if (data == '003') {
        await bot.sendMessage(chatId, `My Clone Army \nСколько ключей нужно?`, countOfKeys);
        gameChoice = 3;
    }
    else if (data == '004') {
        await bot.sendMessage(chatId, `Train Miner \nСколько ключей нужно?`, countOfKeys);
        gameChoice = 4;
    }
    else if (data == '005') {
        await bot.sendMessage(chatId, `MergeAway \nСколько ключей нужно?`, countOfKeys);
        gameChoice = 5;
    }
    else if (data == '006') {
        await bot.sendMessage(chatId, `Twerk Race 3D \nСколько ключей нужно?`, countOfKeys);
        gameChoice = 6;
    }

    if (data == '1') {
        keyCount = 1;
        await bot.sendMessage(chatId, `Играем в игрушки, через 5-10 минут скинем код, ожидайте`);
        await cl.sendRequest()
    }
    else if (data == '2') {
        keyCount = 2;
        await bot.sendMessage(chatId, `Играем в игрушки, через 5-10 минут скинем код, ожидайте`);
        await cl.sendRequest()
    }
    else if (data == '3') {
        keyCount = 3;
        await bot.sendMessage(chatId, `Играем в игрушки, через 5-10 минут скинем код, ожидайте`);
        await cl.sendRequest()
    }
    else if (data == '4') {
        keyCount = 4;
        await bot.sendMessage(chatId, `Играем в игрушки, через 5-10 минут скинем код, ожидайте`);
        await cl.sendRequest()
    }
})

class Client {
    constructor(chatId) {

    }
    generateClientId = () => {
        const timestamp = Date.now();
        const randomNumbers = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
        return `${timestamp}-${randomNumbers}`;
    }

    login = async (clientId, appToken) => {

        console.log("login");

        const response = await fetch('https://api.gamepromo.io/promo/login-client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appToken,
                clientId,
                clientOrigin: 'deviceid'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        return data.clientToken;
    }

    emulateProgress = async (clientToken, promoId) => {
        const response = await fetch('https://api.gamepromo.io/promo/register-event', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${clientToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promoId,
                eventId: this.generateUUID(),
                eventOrigin: 'undefined'
            })
        });

        if (!response.ok) {
            return false;
        }
        const data = await response.json();
        return data.hasCode;
    };

    generateKey = async (clientToken, promoId) => {
        const response = await fetch('https://api.gamepromo.io/promo/create-code', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${clientToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promoId
            })
        });
        console.log(`${response.status} - ${response.statusText}`);

        if (!response.ok) {
            await bot.sendMessage(this.chatId, `Ошибка, попробуйте позже`, againOptions);
            throw new Error('Failed to generate key');

        }

        const data = await response.json();

        console.log(`response - ${JSON.stringify(data)}`);
        console.log(`response - ${data.promoCode}`);
        return data.promoCode;
    };

    generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    delayRandom = () => Math.random() / 3 + 1;

    sendRequest = async () => {

        const game = games[gameChoice];

        const storageKey = `keys_generated_${game.name}`;

        let progress = 0;
        const updateProgress = (increment, message) => {
            progress += increment;
            console.log(progress);
        };

        const generateKeyProcess = async () => {
            const clientId = this.generateClientId();
            let clientToken;
            try {
                clientToken = await this.login(clientId, game.appToken);

            } catch (error) {
                console.log("login failed");

                return null;
            }

            for (let i = 0; i < 11; i++) {
                await this.sleep(game.eventsDelay * this.delayRandom());
                const hasCode = await this.emulateProgress(clientToken, game.promoId);
                console.log(`hash - ${hasCode}`);
                updateProgress(((100 / game.attemptsNumber) / keyCount), 'Emulating progress...');
                if (hasCode) {
                    break;
                }
            }

            try {
                const key = await this.generateKey(clientToken, game.promoId);
                updateProgress(30 / keyCount, 'Generating key...');
                return key;
            } catch (error) {
                console.log(`Failed to generate key: ${error.message}`);
                return null;
            }
        };

        const keys = await Promise.all(Array.from({ length: keyCount }, generateKeyProcess));

        if (keys.length >= 1) {
            console.log(keys);
            console.log(keys[0]);

            keys.forEach(key => {
                if (key.length < 2) {
                    bot.sendMessage(this.chatId, "Ошибка генерации попробуйте позже")
                }
                else {
                    bot.sendMessage(this.chatId, key)
                }
            }
            )
            await bot.sendMessage(this.chatId, `Готово, подпишитесь на канал, чтобы быть в курсе обновлений\nhttps://t.me/cryptonbaza`, againOptions);
        }
    };
}


