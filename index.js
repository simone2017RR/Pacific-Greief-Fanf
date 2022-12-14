

const Discord = require("discord.js");



const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_VOICE_STATES"],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})

const mysql = require("mysql") 

 
client.login(process.env.token);
const { DisTube } = require("distube")
//Plugin facoltativi
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")

const distube = new DisTube(client, {
    youtubeDL: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
    leaveOnEmpty: true,
    leaveOnStop: true
})
var data = new Date();
var ora = data.getHours();
var minuto = data.getMinutes();




client.on("ready", () => {
    
    client.user.setActivity('il suo codice', { type: 'WATCHING' }); 
    console.log("CIAO");

    client.guilds.cache.forEach(guild => {
       

        guild.commands.create({
            name: "espelli",
            description: "Espellere un utente",
            options: [
                {
                    name: "user",
                    description: "L'utente da espellere",
                    type: "USER",
                    required: true
                },
                {
                    name: "reason",
                    description: "Motivazione",
                    type: "STRING",
                    required: false
                }
            ]
        })

        guild.commands.create({
            name: "ban",
            description: "bannare un utente",
            options: [
                {
                    name: "user",
                    description: "L'utente da bannnare",
                    type: "USER",
                    required: true
                },
                {
                    name: "reason",
                    description: "Motivazione",
                    type: "STRING",
                    required: false
                }
            ]
        })

        guild.commands.create({
            name: "ora",
            description: "Risponde con l'orario",
            
        })

        guild.commands.create({
            name: "social-list",
            description: "Risponde con la lista dei social",
            
        })

        guild.commands.create({
            name: "tik-tok",
            description: "Tik tok user",
            
        })

        guild.commands.create({
            name: "contributi",
            description: "Dona e aiuta la community",
            
        })

        guild.commands.create({
            name: "serverinfo",
            description: "Tutte le informazioni sul server",
            
        })

        guild.commands.create({
            name: "dashboard",
            description: "Risponde con il link della dashboard",
            
        })

        guild.commands.create({
            name: "warn",
            description: "Warnare un utente un utente",
            options: [
                {
                    name: "user",
                    description: "L'utente da bannnare",
                    type: "USER",
                    required: true
                },
                {
                    name: "reason",
                    description: "Motivazione",
                    type: "STRING",
                    required: false
                }
            ]

        })

        guild.commands.create({
            name: "verificati",
            description: "Aggiunge il ruolo membro",
            
        })

        guild.commands.create({
            name: "play",
            description: "Metti della musica",
            
        })

        guild.commands.create({
            name: "stop",
            description: "Ferma la canzone",
            
        })

        guild.commands.create({
            name: "disablita",
            description: "Disabilita il canale",
            
        })



        
    })
})

const { createCanvas, loadImage, registerFont } = require("canvas")
registerFont("./font/Roboto.ttf", { family: "roboto" })
registerFont("./font/RobotoBold.ttf", { family: "robotoBold" })



client.on("guildMemberAdd", async member => {
    //Creare un canvas
    let canvas = await createCanvas(1700, 600) //createCanvas(larghezza, altezza)
    let ctx = await canvas.getContext("2d")

    //Caricare un immagine
    let img = await loadImage("./img/1.png")
    ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2) //drawImage(immagine, posizioneX, posizioneY, larghezza, altezza)


    //Riempire di un colore
    ctx.fillStyle = "rgba(0,0,0,0.30)"
    ctx.fillRect(70, 70, canvas.width - 70 - 70, canvas.height - 70 - 70) //fillReact(posizioneX, posizioneY, larghezza, altezza)

    //Caricare un immagine rotonda
    ctx.save()
    ctx.beginPath()
    ctx.arc(150 + 300 / 2, canvas.height / 2, 150, 0, 2 * Math.PI, false) //arc(centroX, centroY, raggio, startAngolo, endAngolo, sensoOrario/Antiorario)
    ctx.clip()
    img = await loadImage(member.displayAvatarURL({ format: "png" }))
    ctx.drawImage(img, 150, canvas.height / 2 - 300 / 2, 300, 300)
    ctx.restore()

    //Creare le scritte
    ctx.fillStyle = "#fff"
    ctx.textBaseline = "middle"

    ctx.font = "80px roboto" //potete anche inserire sans-serif
    ctx.fillText("BENVENUTO", 500, 200) //Testo, posizioneX, posizioneY

    ctx.font = "100px robotoBold"
    ctx.fillText(member.user.username.slice(0, 25), 500, canvas.height / 2)

    ctx.font = "50px roboto"
    ctx.fillText(`${member.guild.memberCount}?? membro`, 500, 400)

    //Mandare un canvas
    let channel = client.channels.cache.get("999267985069985855")

    let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "canvas.png")

    channel.send({ files: [attachment] })

    
})


client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return

    

   

    if (interaction.commandName == "espelli") {
        if (!interaction.member.permissions.has("KICK_MEMBERS")) {
            return interaction.reply({ content: "Non hai il permesso", ephemeral: true })
        }

        var utente = interaction.options.getUser("user")
        var reason = interaction.options.getString("reason") || "Nessun motivo"

        var member = interaction.guild.members.cache.get(utente.id)
        if (!member?.kickable) {
            return interaction.reply({ content: "Non posso espelere questo utente", ephemeral: true })
        }

        member.kick()

        var embed = new Discord.MessageEmbed()
            .setTitle("Utente espulso")
            .setThumbnail(utente.displayAvatarURL())
            .addField("Utente", utente.toString())
            .addField("Motivazione", reason)
            .setColor("AQUA")

        interaction.reply({ embeds: [embed] })
    }

    if (interaction.commandName == "ban") {
        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            return interaction.reply({ content: "Non hai il permesso", ephemeral: true })
        }

        var utente = interaction.options.getUser("user")
        var reason = interaction.options.getString("reason") || "Nessun motivo"

        var member = interaction.guild.members.cache.get(utente.id)
        if (!member?.kickable) {
            return interaction.reply({ content: "Non posso bannare questo utente", ephemeral: true })
        }

        member.ban()

        var embed = new Discord.MessageEmbed()
            .setTitle("Utente bannato")
            .setThumbnail(utente.displayAvatarURL())
            .addField("Utente", utente.toString())
            .addField("Motivazione", reason)
            .setColor("AQUA")

        interaction.reply({ embeds: [embed] })
    }

    if (interaction.commandName == "ora") {
        interaction.reply('ORA ATTUALE :alarm_clock: :' + ora + ':' + minuto);
        
    }



    if (interaction.commandName == "contributi") {
        interaction.reply({ content: "Se ci vovvesti donare e dare un contributo alla communito potresti donare anche sono 1 euro per l'impegno qui: https://www.paypal.me/thomas10998", ephemeral: true });
        
    }
    
    if (interaction.commandName == "tik-tok") {
        interaction.reply({ content: "Questa ?? la nostra pagina tik tok: https://www.tiktok.com/@pacific.grief.gang", ephemeral: true });
        
    }

    if (interaction.commandName == "dashboard") {
        interaction.reply("Ecco il link della dashboard");
        
    }

    if (interaction.commandName == "warn") {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send('Non hai il permesso');
        }
        
        
    }

    if (interaction.commandName == "verificati") {
        if (utente.roles.cache.has("ruolo non verif")) {
            interaction.reply({ content: "Ti sei apena verificato", ephemeral: true })
            utente.roles.add("ruolo verificato");
        }

        else if (utente.roles.cache.has("ruolo verificato")) {
            interaction.reply({ content: "Sei gi?? verificato", ephemeral: true })
            
        }
    }

    if (interaction.commandName == "play") {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply("Devi essere in un canale vocale")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return interaction.reply("Qualun'altro sta gi?? ascoltando della musica")
        }

        let args = message.content.split(/\s+/)
        let query = args.slice(1).join(" ")

        if (!query) {
            return interaction.reply("Inserisci la canzone che vuoi ascoltare")
        }

        distube.play(voiceChannelBot || voiceChannel, query, {
            member: message.member,
            textChannel: message.channel,
            message: message
        })

        if (interaction.commandName == "warn") {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send('Non hai il permesso');
        }
        
        
    }

    if (interaction.commandName == "stop") {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("Devi essere in un canale vocale")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Qualun'altro sta gi?? ascoltando della musica")
        }

        try {
            distube.pause(message)
        } catch {
            return message.channel.send("Nessuna canzone in riproduzione o canzone gi?? in pausa")
        }

        message.channel.send("Canzone  in pausa")
        
        
    }
    if (interaction.commandName == "disabilita") {
        interaction.reply("!!ATTENZIONE CANALE DISABILITATO NON MUOVERSI PER NESSUN MOTIVO!!")
        let button6 = new Discord.MessageButton()
            .setLabel("ATTIVITA: disabilitata")
            .setCustomId("apriTicket")
            .setStyle("DANGER")
            .setDisabled()
            

        let row5 = new Discord.MessageActionRow()
            .addComponents(button6)

        message.channel.send({ components: [row5, row5] })
        
    }


        
        
    }

    
    
})


distube.on("addSong", (queue, song) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Canzone aggiunta")
        .addField("Canzone:", song.name)

    queue.textChannel.send({ embeds: [embed] })
})

distube.on("playSong", (queue, song) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Metto musica...")
        .addField("Canzone:", song.name)
        .addField("Richiesta da:", song.user.toString())

    queue.textChannel.send({ embeds: [embed] })
})

distube.on("searchNoResult", (message, query) => {
    message.channel.send("Canzone non trovata")
})



   
    




//Prima di tutto mandare il messaggio del ticket
client.on("messageCreate", message => {
    if (message.content == "!grief") {
        let button1 = new Discord.MessageButton()
            .setLabel("???")
            .setCustomId("Richiesta")
            .setStyle("PRIMARY")

        let row = new Discord.MessageActionRow()
            .addComponents(button1)
        
        let button2 = new Discord.MessageButton()
            .setLabel("???")
            .setCustomId("Online")
            .setStyle("DANGER")
            .setDisabled()

        let row1 = new Discord.MessageActionRow()
            .addComponents(button2)

        let button3 = new Discord.MessageButton()
            .setLabel("???")
            .setCustomId("Invito")
            .setStyle("SUCCESS")
            .setDisabled()

        let row2 = new Discord.MessageActionRow()
            .addComponents(button3)

        message.channel.send({ content: "???", components: [row, row1, row2] })
    }
})

client.on("interactionCreate", interaction => {
    if (interaction.customId == "Online") {
        interaction.reply({ content: "Link: https://bit.ly/3BflOQU", ephemeral: true })
    }
        

})

client.on("interactionCreate", interaction => {
    if (interaction.customId == "Invito") {
        interaction.reply({ content: "Invito Scaricabile per partneship + banner : (sito in costruzione)", ephemeral: true })
    }
        

})

client.on("messageCreate", message => {
    if (message.content == "!disabled") {
        message.channel.send("!!ATTENZIONE CANALE DISABILITATO NON MUOVERSI PER NESSUN MOTIVO!!")
        let button6 = new Discord.MessageButton()
            .setLabel("ATTIVITA: disabilitata")
            .setCustomId("apriTicket")
            .setStyle("DANGER")
            .setDisabled()
            

        let row5 = new Discord.MessageActionRow()
            .addComponents(button6)

        message.channel.send({ components: [row5] })
    }
})


client.on("interactionCreate", interaction => {
    if (interaction.customId == "Richiesta") {
        

        let button4 = new Discord.MessageButton()
            .setLabel("??? CHIUDI")
            .setCustomId("Chiudi")
            .setStyle("DANGER")

        let row3 = new Discord.MessageActionRow()
            .addComponents(button4)
        
        if (interaction.guild.channels.cache.find(canale => canale.topic == `User ID: ${interaction.user.id}`)) {
            interaction.user.send("Hai gia una richiesta in sospeso").catch(() => { })
            return
        }
        interaction.guild.channels.create(interaction.user.username, {
            type: "text",
            topic: `User ID: ${interaction.user.id}`,
            parent: "1014606887674712115", //Settare la categoria,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL"]
                },
                { //Aggiungere altri "blocchi" se si vogliono dare permessi anche a ruoli o utenti
                    id: "1014605533224902778",
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        }).then(canale => {
            canale.send({ content: "Lo sapevi che per le richieste online ci mettiamo meno di 24 ore per effettuarlo! Provalo anche tu su Pacific Grief Gang", components: [row3] })
        })
    }
})

client.on("interactionCreate", interaction => {
    if (interaction.customId == "Chiudi") {
        interaction.reply("!close")

    }
})

client.on("interactionCreate", interaction => {
    if (interaction.customId == "ChiudiTicket") {
        interaction.reply("!close")

    }
})

client.on("messageCreate", message => {
    if (message.content == "!close") {
        let topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            let idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!add")) {
        let topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            let idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                let utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
                let haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }
                message.channel.permissionOverwrites.edit(utente, {
                    VIEW_CHANNEL: true
                })
                message.channel.send(`${utente.toString()} ?? stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!remove")) {
        let topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            let idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                let utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
                let haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }
                if (utente.permissions.has("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }
                message.channel.permissionOverwrites.edit(utente, {
                    VIEW_CHANNEL: false
                })
                message.channel.send(`${utente.toString()} ?? stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
})

client.on("messageCreate", message => {
    if (message.content == "!ticket") {
        var embed4 = new Discord.MessageEmbed()
            .setTitle("?????????? ????? ?????????????????!")
            .setDescription("C????????????? s????? ????????s??????????? s??????? s??? ??????? ????s?????????? ????? s???????????????????? ?????????.")
            .setFooter("SE VUOI RICHIEDERE UN GIREF VAI SU #???????????????????????s??????-???????????")
            
            .setColor("GREEN")

        let button5 = new Discord.MessageButton()
            .setLabel("Apri ticket")
            .setCustomId("apriTicket")
            .setStyle("SUCCESS")

        let row4 = new Discord.MessageActionRow()
            .addComponents(button5)

        message.channel.send({ embeds: [embed4], components: [row4] })
    }
})

client.on("interactionCreate", interaction => {
    if (interaction.customId == "apriTicket") {
        
        let button5 = new Discord.MessageButton()
            .setLabel("??? CHIUDI")
            .setCustomId("ChiudiTicket")
            .setStyle("DANGER")

        let row4 = new Discord.MessageActionRow()
            .addComponents(button5)
        
        if (interaction.guild.channels.cache.find(canale => canale.topic == `User ID: ${interaction.user.id}`)) {
            interaction.user.send("Hai gia un ticket aperto").catch(() => { })
            return
        }
        interaction.guild.channels.create(interaction.user.username, {
            type: "text",
            topic: `User ID: ${interaction.user.id}`,
            parent: "1014606887674712115", //Settare la categoria,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: interaction.user.id,
                    allow: ["VIEW_CHANNEL"]
                },
                { //Aggiungere altri "blocchi" se si vogliono dare permessi anche a ruoli o utenti
                    id: "1014605533224902778",
                    allow: ["VIEW_CHANNEL"]
                }
            ]
        }).then(canale => {
            canale.send({ content: "Grazie per aver aperto un ticket", components: [row4] })
        })
    }
})

client.on("messageCreate", message => {
    if (message.content == "!close") {
        let topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            let idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!add")) {
        let topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            let idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                let utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
                let haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }
                message.channel.permissionOverwrites.edit(utente, {
                    VIEW_CHANNEL: true
                })
                message.channel.send(`${utente.toString()} ?? stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!remove")) {
        let topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            let idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                let utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
                let haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }
                if (utente.permissions.has("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }
                message.channel.permissionOverwrites.edit(utente, {
                    VIEW_CHANNEL: false
                })
                message.channel.send(`${utente.toString()} ?? stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
})