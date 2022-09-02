

const Discord = require('discord.js');

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_VOICE_STATES"],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})
const mysql = require("mysql") 

client.login(process.env.token);




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
    })
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

        member.kick()

        var embed = new Discord.MessageEmbed()
            .setTitle("Utente bannato")
            .setThumbnail(utente.displayAvatarURL())
            .addField("Utente", utente.toString())
            .addField("Motivazione", reason)
            .setColor("AQUA")

        interaction.reply({ embeds: [embed] })
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


client.on("interactionCreate", interaction => {
    if (interaction.customId == "Richiesta") {
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
            canale.send("Grazie per aver aperto un ticket")
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