const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
const client = new Discord.Client();
const got = require('got');
const Canvacord = require('canvacord')
const db = require('quick.db')

client.on("ready", () => {
  console.log(`${client.user.tag} ist Startklar.`)
  client.user.setActivity({ type: "PLAYING", name: `on Sehrschlecht.yt`, url: 'https://www.youtube.com/channel/UCentT7GsT0GKKtnKOP4Ew5g'})
})

client.on('message', message => {
  //Paul das ist XP System
  xp(message)
    if(message.content.startsWith(`!rank`)) {
    if(message.author.bot) return;
    var user = message.mentions.users.first() || message.author;
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 500 + 500 // 500 + 1000 + 1500
    const rankcard = new Canvacord.Rank()
        .setAvatar(user.displayAvatarURL({format: 'png', dynamic: true}))
        .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
        .setRequiredXP(xpNeeded)
        .setStatus(user.presence.status)
        .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
        .setRank(1, 'RANK', false)
        .setProgressBar("#0088FF", "COLOR") //Hier kannst du die Farbe von dieser Leiste ändern
        .setOverlay("#000088") //hier den Rahmen von der Rancard
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("COLOR", "#a8a8a8") //und hier den Hintergrund
        rankcard.build()
        .then(data => {
            const atta = new Discord.MessageAttachment(data, "RankCard.png")
            message.channel.send(atta)
        })
    }

    function xp(message) {
        if(message.author.bot) return
        const randomNumber = Math.floor(Math.random() * 10) + 15;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber) 
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500;
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1) 
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            message.channel.send(`Gratulation ${message.author}, Du bist jetzt auf dem Level ${newLevel}`)
        }
    }
    //Das Leveling System geht bis hier
  if (message.content === '!ping') {
    message.channel.send('pong');
  }
  else if (message.content === '!info') {
    message.channel.send('gemacht von <@691624547941744651> und <@703592068366467102>')
  }
  else if (message.content === '!commands') {
    message.channel.send('commands: !info, !Dev, !Owner, !info, !website, !twitch, !ts, !yt, !partner, !meme')
  }
  else if (message.content === '!website') {
    message.channel.send('Meine Website: https://linktr.ee/Chaospaul__')
  }
  else if (message.content === '!twitch') {
    message.channel.send('https://www.twitch.tv/chaospaul__')
  }
  else if (message.content === '!Owner') {
    message.channel.send('Der Offizielle Server eigentümer ist <@703592068366467102> aber sonnst die alle die den <@799732215831330837>, den <@801706703619227668> und den <@795627691817959449> rang haben')
  }
  else if (message.content === '!ts') {
    message.channel.send('TeamSpeak-IP: PSMP')
  }
  else if (message.content === '!Dev') {
    message.channel.send('Die Bot Devs sind Kian und Paul')
  }
  else if (message.content === '!partner') {
    message.channel.send('noch niemand')
  }
  else if (message.content === '!yt') {
    message.channel.send('https://www.youtube.com/channel/UCentT7GsT0GKKtnKOP4Ew5g')  }

  else if (message.content === '!meme') {
    got('https://www.reddit.com/r/memes/random/.json')
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;

			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor('RANDOM');
			embed.setImage(memeImage);
			embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

			message.channel.send(embed);
		})
		.catch(console.error);
  }});

var fs = require('fs');
try {  
    var data = fs.readFileSync('tokens/token.txt', 'utf8');    
} catch(e) {
    console.log('Error:', e.stack);
}
client.login(data.toString());