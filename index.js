const data = Date.now()
const clientId = '632286895665315855';
const RPC = require('discord-rpc');
const activeWin = require('active-win');
RPC.register(clientId);
const client = new RPC.Client({
    transport: 'ipc'
});

async function updatePresence() {
    let window = activeWin.sync();

    try {
    	window = {
    		name: window.owner.name,
    		title: window.title
    	}
    	let anime = {
    		name: window.title.match(/Аниме (.*) смотреть онлайн/) ? window.title.match(/Аниме (.*) смотреть онлайн/)[1] : null,
    		status: 'Просматривается, серия: [?/?]' //TODO: вывод серии / по возможности thumbnail
    	}
    	if(anime.name === null) {
    		anime = {
    			name: 'Currently in '+ window.name,
    			status: 'Не просматривается, открыто другое окно'
    		}
    	}
        updateRP(anime);
    } catch (e) {
        console.log(e);
    }
}

function updateRP(anime) {
    client.setActivity({
        details: anime.name,
        state: anime.status,
        largeImageKey: '-1',
        largeImageText: 'YummyAnime', //TODO: вывод серии / по возможности thumbnail
        startTimestamp: data,
        instance: false
    }).catch(err => {
        console.log(err);
    });

}
client.on('ready', () => {
    console.log("Connected!");
    setInterval(() => {
        updatePresence();
    }, 10000);
});

client.login({
    clientId
}).catch(console.error);
