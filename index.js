

const Discord = require('discord.js');

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_VOICE_STATES"],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})
const mysql = require("mysql") 

client.login(process.env.token);
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
    ctx.fillText(`${member.guild.memberCount}° membro`, 500, 400)

    //Mandare un canvas
    let channel = client.channels.cache.get("999267985069985855")

    let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "canvas.png")

    channel.send({ files: [attachment] })

    let embed = new Discord.MessageEmbed()
        .setTitle("BENVENUTO")
        .setThumbnail("attachment://canvas.png")

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
        interaction.reply({ content: "Questa è la nostra pagina tik tok: https://www.tiktok.com/@pacific.grief.gang", ephemeral: true });
        
    }

    
    
})



   
    




//Prima di tutto mandare il messaggio del ticket
client.on("messageCreate", message => {
    if (message.content == "!grief") {
        let button1 = new Discord.MessageButton()
            .setLabel("ㅤ")
            .setCustomId("Richiesta")
            .setStyle("PRIMARY")

        let row = new Discord.MessageActionRow()
            .addComponents(button1)
        
        let button2 = new Discord.MessageButton()
            .setLabel("ㅤ")
            .setCustomId("Online")
            .setStyle("DANGER")

        let row1 = new Discord.MessageActionRow()
            .addComponents(button2)

        let button3 = new Discord.MessageButton()
            .setLabel("ㅤ")
            .setCustomId("Invito")
            .setStyle("SUCCESS")

        let row2 = new Discord.MessageActionRow()
            .addComponents(button3)

        message.channel.send({ content: "ㅤ", components: [row, row1, row2] })
    }
})

client.on("interactionCreate", interaction => {
    if (interaction.customId == "Online") {
        interaction.reply({ content: "Link: (stio in costruzione)", ephemeral: true })
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
            .setLabel("⛔ CHIUDI")
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
                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
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
                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
})

client.on("messageCreate", message => {
    if (message.content == "!ticket") {
        let button5 = new Discord.MessageButton()
            .setLabel("Apri ticket")
            .setCustomId("apriTicket")
            .setStyle("SUCCESS")

        let row4 = new Discord.MessageActionRow()
            .addComponents(button5)

        message.channel.send({ content: "Clicca sul bottone per aprire un ticket", components: [row4] })
    }
})

client.on("interactionCreate", interaction => {
    if (interaction.customId == "apriTicket") {
        
        let button5 = new Discord.MessageButton()
            .setLabel("⛔ CHIUDI")
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
                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
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
                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
})