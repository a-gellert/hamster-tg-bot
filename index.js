const TelegramApi = require("node-telegram-bot-api");

const TELEGRAM_URI = "6956769088:AAETz5fheu8VDzlVHhg-uSjdFh-qNTHDBl8";

const EVENTS_DELAY = 20000;
const MAX_KEYS_PER_GAME_PER_DAY = 6;

 const port = process.env.PORT || 3000;

 const http = require('http');

 const server = http.createServer();
 server.listen(port);

process.setMaxListeners(0);
let chats = [];

let text = "";
let chatId = 1;
let gameChoice = 1;
let keyCount = 1;

const games = {
  1: {
    name: "Stone Age",
    appToken: "04ebd6de-69b7-43d1-9c4b-04a6ca3305af",
    promoId: "04ebd6de-69b7-43d1-9c4b-04a6ca3305af",
    eventsDelay: 41000,
    attemptsNumber: 24,
  },
  2: {
    name: "Chain Cube 2048",
    appToken: "d1690a07-3780-4068-810f-9b5bbf2931b2",
    promoId: "b4170868-cef0-424f-8eb9-be0622e8e8e3",
    eventsDelay: 20000,
    attemptsNumber: 12,
  },
  3: {
    name: "Cafe Dash",
    appToken: "bc0971b8-04df-4e72-8a3e-ec4dc663cd11",
    promoId: "bc0971b8-04df-4e72-8a3e-ec4dc663cd11",
    eventsDelay: 20000,
    attemptsNumber: 20,
  },
  4: {
    name: "Train Miner",
    appToken: "82647f43-3f87-402d-88dd-09a90025313f",
    promoId: "c4480ac7-e178-4973-8061-9ed5b2e17954",
    eventsDelay: 20000,
    attemptsNumber: 12,
  },
  5: {
    name: "MergeAway",
    appToken: "8d1cc2ad-e097-4b86-90ef-7a27e19fb833",
    promoId: "dc128d28-c45b-411c-98ff-ac7726fbaea4",
    eventsDelay: 20000,
    attemptsNumber: 12,
  },
  6: {
    name: "Twerk Race 3D",
    appToken: "61308365-9d16-4040-8bb0-2f4a4c69074c",
    promoId: "61308365-9d16-4040-8bb0-2f4a4c69074c",
    eventsDelay: 20000,
    attemptsNumber: 12,
  },
  7: {
    name: "Polysphere",
    appToken: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71",
    promoId: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71",
    eventsDelay: 20000,
    attemptsNumber: 18,
  },
  8: {
    name: "Mow and Trim",
    appToken: "ef319a80-949a-492e-8ee0-424fb5fc20a6",
    promoId: "ef319a80-949a-492e-8ee0-424fb5fc20a6",
    eventsDelay: 20000,
    attemptsNumber: 22,
  },
  9: {
    name: "Tile Trio",
    appToken: "e68b39d2-4880-4a31-b3aa-0393e7df10c7",
    promoId: "e68b39d2-4880-4a31-b3aa-0393e7df10c7",
    eventsDelay: 40000, // 20 seconds
    attemptsNumber: 22,
  },
  10: {
    name: "Zoopolis",
    appToken: "b2436c89-e0aa-4aed-8046-9b0515e1c46b",
    promoId: "b2436c89-e0aa-4aed-8046-9b0515e1c46b",
    eventsDelay: 20000,
    attemptsNumber: 22,
  },
  11: {
    name: "Fluff Crusade",
    appToken: "112887b0-a8af-4eb2-ac63-d82df78283d9",
    promoId: "112887b0-a8af-4eb2-ac63-d82df78283d9",
    eventsDelay: 30000,
    attemptsNumber: 21,
  },
};

console.log(new Date());
const bot = new TelegramApi(TELEGRAM_URI, { polling: true });

const gameSelectOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: `${String.fromCodePoint(0x1f3b2)}Chain Cube 2048`,
          callback_data: "002",
        },
        {
          text: `${String.fromCodePoint(0x1f682)}Train Miner`,
          callback_data: "004",
        },
      ],
      [
        {
          text: `${String.fromCodePoint(0x1f5dd)}MergeAway`,
          callback_data: "005",
        },
        {
          text: `${String.fromCodePoint(0x1f3c3)}Twerk Race 3D`,
          callback_data: "006",
        },
      ],
      [
        {
          text: `${String.fromCodePoint(0x1f310)}Polysphere`,
          callback_data: "007",
        },
        {
          text: `${String.fromCodePoint(0x1f33f)}Mow and Trim`,
          callback_data: "008",
        },
      ],
      [
        {
          text: `${String.fromCodePoint(0x1f340)}Tile Trio`,
          callback_data: "009",
        },
        {
          text: `${String.fromCodePoint(0x1f9a5)}Zoopolis`,
          callback_data: "010",
        },
      ],
      [
        {
          text: `${String.fromCodePoint(0x1f6e1)}Fluff Crusade`,
          callback_data: "011",
        },
        {
          text: `${String.fromCodePoint(0x1f5ff)}Stone Age`,
          callback_data: "001",
        },
      ],
    ],
  }),
};
const countOfKeys = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
      ],
      [
        { text: "3", callback_data: "3" },
        { text: "4", callback_data: "4" },
      ],
    ],
  }),
};
const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: `${String.fromCodePoint(
            0x1f504
          )}Сгенерировать ещё${String.fromCodePoint(
            0x1f504
          )}\n${String.fromCodePoint(
            0x1f504
          )}Generate again${String.fromCodePoint(0x1f504)}`,
          callback_data: "/again",
        },
      ],
    ],
  }),
};
bot.setMyCommands([
  { command: "/start", description: "Приветсвие" },
  //  { command: '/testik', description: 'Отправка тестового запроса' }
]);
let cl;
bot.on("message", async (msg) => {
  text = msg.text;
  console.log(msg);
  chatId = msg.chat.id;
  if (text == "/start") {
    await bot
      .sendMessage(chatId, "Выберите игру\nChoose the game", gameSelectOptions)
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
  }
  if (text === "/testik") {
    // await bot.sendMessage(chatId, `Тестируем`);
    for (let index = 0; index < 8; index++) {
      let cl = new Clientw(653948165, 1, 11);
      await cl.sendRequest();
    }

    // let cl = new Client(653948165, 8, 11);

    //  await cl.sendRequest();
    //   await cl.sendRequest()
  }
  if (text === "/test") {
    // await bot.sendMessage(chatId, `Тестируем`);
    // for (let index = 0; index < 8; index++) {
    //   let cl = new Clientw(653948165, 1, 11);
    //   await cl.sendRequest();
    // }

    let cl = new Client(653948165, 4, 1);

    await cl.sendRequest();
    //   await cl.sendRequest()
  }

  if (!isNaN(text)) {
    console.log(text);

    for (let index = 0; index < 4; index++) {
      let cl = new Clientw(384518188, 1, text);
      await cl.sendRequest();
    }

    // let cl = new Client(653948165, 8, 11);

    //  await cl.sendRequest();
    //   await cl.sendRequest()
  }
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  console.log(data);
  // bot.sendMessage(384518188, data).then(function (resp) { }).catch(function (error) {
  //     if (error.response) {
  //         console.log(403);
  //     }
  // });

  chatId = msg.message.chat.id;

  if (chats.indexOf(chatId) >= 0 && msg.message.chat.username != "g_ellert") {
    await bot
      .sendMessage(
        chatId,
        "Ключи уже генерируются, дождитесь пока не закончится предыдущая генерация\nThe keys are already being generated, wait until the previous generation is over"
      )
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    return;
  }

  if (data === "/again") {
    await bot
      .sendMessage(chatId, "Выберыце гульню", gameSelectOptions)
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
  }

  if (data == "001") {
    console.log("saaaaaaaaaaaaaaaaa");
    await bot
      .sendMessage(chatId, `Stone Age\n\nКолькі ключоў трэба?`, countOfKeys)
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 1;
  } else if (data == "002") {
    await bot
      .sendMessage(
        chatId,
        `Chain Cube 2048 \n\nКолькі ключоў трэба?`,
        countOfKeys
      )
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 2;
  } else if (data == "003") {
    await bot
      .sendMessage(chatId, `Tile Trio \n\nКолькі ключоў трэба?`, countOfKeys)
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 3;
  } else if (data == "004") {
    await bot
      .sendMessage(chatId, `Train Miner \n\nКолькі ключоў трэба?`, countOfKeys)
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 4;
  } else if (data == "005") {
    await bot
      .sendMessage(chatId, `MergeAway \n\nКолькі ключоў трэба?`, countOfKeys)
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 5;
  } else if (data == "006") {
    await bot
      .sendMessage(
        chatId,
        `Twerk Race 3D \n\nКолькі ключоў трэба?`,
        countOfKeys
      )
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 6;
  } else if (data == "007") {
    await bot
      .sendMessage(chatId, `Polysphere \n\nКолькі ключоў трэба?`, countOfKeys)
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 7;
  } else if (data == "008") {
    await bot
      .sendMessage(chatId, `Mow and Trim \n\nКолькі ключоў трэба?`, countOfKeys)
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 8;
  } else if (data == "009") {
    await bot
      .sendMessage(chatId, `Tile Trio \n\nКолькі ключоў трэба?`, countOfKeys)
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 9;
  } else if (data == "010") {
    await bot
      .sendMessage(chatId, `Zoopolis \n\nКолькі ключоў трэба?`, countOfKeys)
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 10;
  } else if (data == "011") {
    await bot
      .sendMessage(
        chatId,
        `Fluff Crusade \n\nКолькі ключоў трэба?`,
        countOfKeys
      )
      .then(function (resp) {})
      .catch(function (error) {
        if (error.response) {
          console.log(403);
        }
      });
    gameChoice = 11;
  }

  if (data == "1") {
    keyCount = 1;
    generate();
  } else if (data == "2") {
    keyCount = 2;
    generate();
  } else if (data == "3") {
    keyCount = 3;
    generate();
  } else if (data == "4") {
    keyCount = 4;
    generate();
  }
  console.log(msg.message.chat);
});
const generate = async () => {
  let cl = new Client(chatId, keyCount, gameChoice);
  chats.push(chatId);
  await bot.sendMessage(
    chatId,
    `Гуляем у цацкі, праз 5-10 хвілін скінем код, чакайце\nУ славу Северкі`
  );
  await cl.sendRequest();
};

let requestQueue = [];
let isProcessing = false;
let isPaused = false;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const processQueue = async () => {
  if (isProcessing || isPaused || requestQueue.length === 0) return;

  isProcessing = true;
  const nextRequest = requestQueue.shift(); // Берем первый запрос из очереди

  try {
    await nextRequest(); // Выполняем этот запрос
  } catch (error) {
    console.log("Error during request processing:", error);
    isPaused = true; // Приостанавливаем очередь
    await delay(2000); // Ждем 2 секунды
    isPaused = false;
    console.log("Retrying...");
    requestQueue.unshift(nextRequest); // Возвращаем неудавшийся запрос в начало очереди
  } finally {
    isProcessing = false;

    if (requestQueue.length > 0) {
      processQueue(); // Обработка следующего запроса
    }
  }
};

// Функция, которая добавляет запрос в очередь
const addToQueue = (fn) => {
  requestQueue.push(fn); // Добавляем функцию в очередь
  processQueue(); // Запускаем обработку очереди, если она не запущена
};
class Client {
  constructor(chatId, keyCount, gameChoice) {
    this.chatIdClient = chatId;
    this.keyCount = keyCount;
    this.gameChoice = gameChoice;
  }
  generateClientId = () => {
    const timestamp = Date.now();
    const randomArray = new Uint32Array(5);
    crypto.getRandomValues(randomArray);
    const randomNumbers = Array.from(randomArray, (num) => num.toString(10))
      .join("")
      .slice(0, 19);
    return `${timestamp}-${randomNumbers}`;
  };

  login = async (clientId, appToken) => {
    let i = 0;
    const response = await fetch(
      "https://api.gamepromo.io/promo/login-client",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appToken,
          clientId,
          clientOrigin: "deviceid",
        }),
      }
    );
    i++;
    if (!response.ok) {
      console.log("Failed to login");

      return null;
    }
    console.log("OK");
    const data = await response.json();
    return data.clientToken;
  };

  emulateProgress = async (clientToken, promoId) => {
    const response = await fetch(
      "https://api.gamepromo.io/promo/register-event",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${clientToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promoId,
          eventId: this.generateUUID(),
          eventOrigin: "undefined",
        }),
      }
    );
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data.hasCode;
  };

  generateKey = async (clientToken, promoId) => {
    const response = await fetch("https://api.gamepromo.io/promo/create-code", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clientToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promoId,
      }),
    });

    if (!response.ok) {
      await bot.sendMessage(
        this.chatIdClient,
        `Ошибка, попробуйте позже`,
        againOptions
      );
      console.log("Failed to generate key");
    }

    const data = await response.json();

    return data.promoCode;
  };

  generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  delayRandom = () => Math.random() / 3 + 1;

  sendRequest = async () => {
    const game = games[this.gameChoice];

    let progress = 0;
    const updateProgress = (increment, message) => {
      progress += increment;
      console.log(progress);
    };

    const generateKeyProcess = () => {
      return new Promise((resolve) => {
        addToQueue(async () => {
          // Здесь добавляется функция в очередь
          setTimeout(async () => {
            const clientId = this.generateClientId();
            let clientToken;

            try {
              clientToken = await this.login(clientId, game.appToken);
            } catch (error) {
              console.log("Login failed");
              resolve(null);
            }

            for (let i = 0; i < game.attemptsNumber; i++) {
              await this.sleep(game.eventsDelay * this.delayRandom());
              const hasCode = await this.emulateProgress(
                clientToken,
                game.promoId
              );
              updateProgress(
                100 / game.attemptsNumber / keyCount,
                "Emulating progress..."
              );
              if (hasCode) {
                break;
              }
            }

            try {
              const key = await this.generateKey(clientToken, game.promoId);
              updateProgress(30 / keyCount, "Generating key...");
              resolve(key);
            } catch (error) {
              console.log(`Failed to generate key: ${error.message}`);
              resolve(null);
            }
          }, 1000); // Имитация задержки 1 секунда
        });
      });
    };
    const keys = await Promise.all(
      Array.from({ length: this.keyCount }, generateKeyProcess)
    );

    if (keys.length >= 1) {
      console.log(keys);
      console.log(new Date());
      bot
        .sendMessage(384518188, `Keys${keys}: ${new Date()}`)
        .then(function (resp) {})
        .catch(function (error) {
          if (error.response) {
            console.log(403);
          }
        });
      chats.splice(chats.indexOf(this.chatIdClient), 1);
      keys.forEach((key) => {
        if (key == null || key == undefined) {
          bot
            .sendMessage(
              this.chatIdClient,
              "Ошибка генерации, попробуйте позже\nGeneration error, try again later"
            )
            .then(function (resp) {})
            .catch(function (error) {
              if (error.response) {
                console.log(403);
              }
            });
        } else if (key.length < 2) {
          bot
            .sendMessage(
              this.chatIdClient,
              "Ошибка генерации, попробуйте позже\nGeneration error, try again later"
            )
            .then(function (resp) {})
            .catch(function (error) {
              if (error.response) {
                console.log(403);
              }
            });
        } else {
          bot
            .sendMessage(this.chatIdClient, key)
            .then(function (resp) {})
            .catch(function (error) {
              if (error.response) {
                console.log(403);
              }
            });
        }
      });
      bot
        .sendMessage(this.chatIdClient, "Гатовы", againOptions)
        .then(function (resp) {})
        .catch(function (error) {
          if (error.response) {
            console.log(403);
          }
        });
    }
  };
}

class Clientw {
  constructor(chatId, keyCount, gameChoice) {
    this.chatIdClient = chatId;
    this.keyCount = keyCount;
    this.gameChoice = gameChoice;
  }
  generateClientId = () => {
    const timestamp = Date.now();
    const randomArray = new Uint32Array(5);
    crypto.getRandomValues(randomArray);
    const randomNumbers = Array.from(randomArray, (num) => num.toString(10))
      .join("")
      .slice(0, 19);
    return `${timestamp}-${randomNumbers}`;
  };

  login = async (clientId, appToken) => {
    let i = 0;
    const response = await fetch(
      "https://api.gamepromo.io/promo/login-client",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appToken,
          clientId,
          clientOrigin: "deviceid",
        }),
      }
    );
    i++;
    if (!response.ok) {
      console.log("Failed to login");

      return null;
    }
    console.log("OK");
    const data = await response.json();
    return data.clientToken;
  };

  emulateProgress = async (clientToken, promoId) => {
    const response = await fetch(
      "https://api.gamepromo.io/promo/register-event",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${clientToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promoId,
          eventId: this.generateUUID(),
          eventOrigin: "undefined",
        }),
      }
    );
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data.hasCode;
  };

  generateKey = async (clientToken, promoId) => {
    const response = await fetch("https://api.gamepromo.io/promo/create-code", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clientToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promoId,
      }),
    });

    if (!response.ok) {
      await bot.sendMessage(
        this.chatIdClient,
        `Ошибка, попробуйте позже`,
        againOptions
      );
      console.log("Failed to generate key");
    }

    const data = await response.json();

    return data.promoCode;
  };

  generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  delayRandom = () => Math.random() / 3 + 1;

  sendRequest = async () => {
    const game = games[this.gameChoice];

    let progress = 0;
    const updateProgress = (increment, message) => {
      progress += increment;
      console.log(progress);
    };

    const generateKeyProcess = () => {
      return new Promise((resolve) => {
        addToQueue(async () => {
          // Здесь добавляется функция в очередь
          setTimeout(async () => {
            const clientId = this.generateClientId();
            let clientToken;

            try {
              clientToken = await this.login(clientId, game.appToken);
            } catch (error) {
              console.log("Login failed");
              resolve(null);
            }

            for (let i = 0; i < game.attemptsNumber; i++) {
              await this.sleep(game.eventsDelay * this.delayRandom());
              const hasCode = await this.emulateProgress(
                clientToken,
                game.promoId
              );
              updateProgress(
                100 / game.attemptsNumber / keyCount,
                "Emulating progress..."
              );
              if (hasCode) {
                break;
              }
            }

            try {
              const key = await this.generateKey(clientToken, game.promoId);
              updateProgress(30 / keyCount, "Generating key...");
              resolve(key);
            } catch (error) {
              console.log(`Failed to generate key: ${error.message}`);
              resolve(null);
            }
          }, 1000); // Имитация задержки 1 секунда
        });
      });
    };
    const keys = await Promise.all(
      Array.from({ length: this.keyCount }, generateKeyProcess)
    );

    if (keys.length >= 1) {
      console.log(keys);
      console.log(new Date());
      bot
        .sendMessage(384518188, `Keys${keys}: ${new Date()}`)
        .then(function (resp) {})
        .catch(function (error) {
          if (error.response) {
            console.log(403);
          }
        });
      chats.splice(chats.indexOf(this.chatIdClient), 1);
      keys.forEach((key) => {
        if (key == null || key == undefined) {
          bot
            .sendMessage(
              this.chatIdClient,
              "Ошибка генерации, попробуйте позже\nGeneration error, try again later"
            )
            .then(function (resp) {})
            .catch(function (error) {
              if (error.response) {
                console.log(403);
              }
            });
        } else if (key.length < 2) {
          bot
            .sendMessage(
              this.chatIdClient,
              "Ошибка генерации, попробуйте позже\nGeneration error, try again later"
            )
            .then(function (resp) {})
            .catch(function (error) {
              if (error.response) {
                console.log(403);
              }
            });
        } else {
          bot
            .sendMessage(this.chatIdClient, key)
            .then(function (resp) {})
            .catch(function (error) {
              if (error.response) {
                console.log(403);
              }
            });
        }
      });
    }
  };
}
