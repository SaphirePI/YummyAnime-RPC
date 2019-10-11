const data = Date.now()
const clientId = '632286895665315855';
const RPC = require('discord-rpc');
const activeWin = require('active-win');
RPC.register(clientId);
const client = new RPC.Client({
    transport: 'ipc'
});
var video = null;
var artist = null;

function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}

async function updatePresence() {
    let window = activeWin.sync();

    try {
    	window = {
    		name: window.owner.name,
    		title: window.title
    	}
    	console.log(window)

    	let anime = {
    		name: window.title.match(/Аниме (.*) смотреть онлайн/) ? window.title.match(/Аниме (.*) смотреть онлайн/)[1] : null,
    		status: 'Просматривается, серия: [?/?]'
    	}
    	if(anime.name === null) {
    		anime = {
    			name: 'Currently in '+ window.name,
    			status: 'Не просматривается, открыто другое окно'
    		}
    	}
    	console.log(anime)
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
        largeImageText: 'YummyAnime', //todo : make it show thumbnails & maybe a timer
        startTimestamp: data,
        instance: false
    }).catch(err => {
        console.log(err);
    });

}
client.on('ready', () => {
    console.log("Connected to Discord!");
    setInterval(() => {
        updatePresence();
    }, 10000);
});

client.login({
    clientId
}).catch(console.error);

var http = require('http');
 
http.createServer(function(request, respone){
  respone.writeHead(200, {'Content-type':'text/plan'});
  console.log("Hello")
 
}).listen(7000);