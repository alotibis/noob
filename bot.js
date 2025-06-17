const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');

const ALLOWED_SERVER_ID = '1343651126456614992';
const ANNOUNCEMENT_CHANNEL_ID = '1384204840196112454';
const BOT_TOKEN = 'MTIyNDU5MzM5NTcyNTM2OTM5NA.GvDl_x.eu4bKEIVpBv6JMnih91uXmWEa210AZRAAq9oHI'; // ضع التوكن الجديد هنا

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', async () => {
    console.log(`${client.user.tag} تم الاتصال بالديسكورد!`);
    try {
        // Check if bot is in the allowed server
        const guild = client.guilds.cache.get(ALLOWED_SERVER_ID);
        if (!guild) {
            console.error('البوت غير موجود في السيرفر المحدد!');
            process.exit(1);
        }

        await client.application.commands.set([
            // طرد عضو
            new SlashCommandBuilder()
                .setName('kick')
                .setDescription('طرد عضو من السيرفر')
                .addUserOption(option => 
                    option.setName('member')
                        .setDescription('العضو المراد طرده')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('سبب الطرد')
                        .setRequired(false))
                .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers),

            // حظر عضو
            new SlashCommandBuilder()
                .setName('ban')
                .setDescription('حظر عضو من السيرفر')
                .addUserOption(option =>
                    option.setName('member')
                        .setDescription('العضو المراد حظره')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('سبب الحظر')
                        .setRequired(false))
                .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),

            // كتم عضو
            new SlashCommandBuilder()
                .setName('mute')
                .setDescription('كتم عضو مؤقتاً')
                .addUserOption(option =>
                    option.setName('member')
                        .setDescription('العضو المراد كتمه')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('duration')
                        .setDescription('مدة الكتم بالدقائق')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('سبب الكتم')
                        .setRequired(false))
                .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles),

            // مسح الرسائل
            new SlashCommandBuilder()
                .setName('clear')
                .setDescription('مسح عدد معين من الرسائل')
                .addIntegerOption(option =>
                    option.setName('amount')
                        .setDescription('عدد الرسائل المراد مسحها')
                        .setRequired(true))
                .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

            // تحذير عضو
            new SlashCommandBuilder()
                .setName('warn')
                .setDescription('تحذير عضو')
                .addUserOption(option =>
                    option.setName('member')
                        .setDescription('العضو المراد تحذيره')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('سبب التحذير')
                        .setRequired(false))
                .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

            // إضافة رتبة
            new SlashCommandBuilder()
                .setName('role')
                .setDescription('إضافة رتبة لعضو')
                .addUserOption(option =>
                    option.setName('member')
                        .setDescription('العضو المراد إضافة الرتبة له')
                        .setRequired(true))
                .addRoleOption(option =>
                    option.setName('role')
                        .setDescription('الرتبة المراد إضافتها')
                        .setRequired(true))
                .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles),

            // نزع رتبة
            new SlashCommandBuilder()
                .setName('give_role')
                .setDescription('إزالة رتبة من عضو')
                .addUserOption(option =>
                    option.setName('member')
                        .setDescription('العضو المراد إزالة الرتبة منه')
                        .setRequired(true))
                .addRoleOption(option =>
                    option.setName('role')
                        .setDescription('الرتبة المراد إزالتها')
                        .setRequired(true))
                .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles),

            // معلومات العضو
            new SlashCommandBuilder()
                .setName('users')
                .setDescription('عرض معلومات العضو')
                .addUserOption(option =>
                    option.setName('member')
                        .setDescription('العضو المراد عرض معلوماته')
                        .setRequired(false)),

            // معلومات السيرفر
            new SlashCommandBuilder()
                .setName('server')
                .setDescription('عرض معلومات السيرفر'),

            // قفل القناة
            new SlashCommandBuilder()
                .setName('lock')
                .setDescription('قفل القناة الحالية')
                .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),

            // فتح القناة
            new SlashCommandBuilder()
                .setName('open')
                .setDescription('فتح القناة الحالية')
                .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),

            // إعلان جديد
            new SlashCommandBuilder()
                .setName('اعلان')
                .setDescription('إنشاء إعلان جديد')
                .addStringOption(option =>
                    option.setName('server_name')
                        .setDescription('اسم السيرفر')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('title')
                        .setDescription('عنوان الإعلان')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('mention_type')
                        .setDescription('نوع المنشن')
                        .setRequired(true)
                        .addChoices(
                            { name: '@everyone', value: '@everyone' },
                            { name: '@here', value: '@here' },
                            { name: 'بدون منشن', value: 'none' }
                        ))
                .addIntegerOption(option =>
                    option.setName('duration')
                        .setDescription('مدة الإعلان بالأسابيع')
                        .setRequired(true)
                        .setMinValue(1)
                        .setMaxValue(52))
                .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild),

            new SlashCommandBuilder()
                .setName('temprole')
                .setDescription('إضافة رتبة مؤقتة لعضو')
                .addUserOption(option =>
                    option.setName('member')
                        .setDescription('العضو المراد إضافة الرتبة له')
                        .setRequired(true))
                .addRoleOption(option =>
                    option.setName('role')
                        .setDescription('الرتبة المراد إضافتها')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('duration')
                        .setDescription('مدة الرتبة بالدقائق')
                        .setRequired(true)
                        .setMinValue(1)
                        .setMaxValue(10080)) // أسبوع واحد كحد أقصى
                .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles),

            new SlashCommandBuilder()
                .setName('تحميله')
                .setDescription('تغيير اسم العضو وإضافة رتبة')
                .addUserOption(option =>
                    option.setName('member')
                        .setDescription('العضو المراد تحميله')
                        .setRequired(true))
                .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageNicknames)
        ], ALLOWED_SERVER_ID); // Only register commands in the allowed server
        console.log('تم مزامنة الأوامر بنجاح!');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    try {
        await interaction.deferReply({ ephemeral: true });

        if (interaction.guildId !== ALLOWED_SERVER_ID) {
            await interaction.editReply({ 
                content: 'هذا البوت يعمل فقط في سيرفر محدد!'
            });
            return;
        }

        switch (interaction.commandName) {
            case 'kick':
                const kickMember = interaction.options.getMember('member');
                const kickReason = interaction.options.getString('reason');

                if (!kickMember.kickable) {
                    return interaction.editReply({ content: 'ليس لدي صلاحية لطرد هذا العضو!' });
                }

                await kickMember.kick(kickReason);
                const kickEmbed = new EmbedBuilder()
                    .setTitle('تم طرد العضو')
                    .setDescription(`تم طرد ${kickMember.user.tag} من السيرفر.`)
                    .setColor('#FF0000');
                
                if (kickReason) kickEmbed.addFields({ name: 'السبب', value: kickReason });
                await interaction.editReply({ embeds: [kickEmbed] });
                break;

            case 'ban':
                const banMember = interaction.options.getMember('member');
                const banReason = interaction.options.getString('reason');

                if (!banMember.bannable) {
                    return interaction.editReply({ content: 'ليس لدي صلاحية لحظر هذا العضو!' });
                }

                await banMember.ban({ reason: banReason });
                const banEmbed = new EmbedBuilder()
                    .setTitle('تم حظر العضو')
                    .setDescription(`تم حظر ${banMember.user.tag} من السيرفر.`)
                    .setColor('#8B0000');
                
                if (banReason) banEmbed.addFields({ name: 'السبب', value: banReason });
                await interaction.editReply({ embeds: [banEmbed] });
                break;

            case 'mute':
                const muteMember = interaction.options.getMember('member');
                const muteDuration = interaction.options.getInteger('duration');
                const muteReason = interaction.options.getString('reason');

                let mutedRole = interaction.guild.roles.cache.find(role => role.name === 'مكتوم');
                if (!mutedRole) {
                    mutedRole = await interaction.guild.roles.create({
                        name: 'مكتوم',
                        permissions: []
                    });

                    interaction.guild.channels.cache.forEach(async channel => {
                        await channel.permissionOverwrites.create(mutedRole, {
                            SendMessages: false,
                            Speak: false
                        });
                    });
                }

                await muteMember.roles.add(mutedRole);
                const muteEmbed = new EmbedBuilder()
                    .setTitle('تم كتم العضو')
                    .setDescription(`تم كتم ${muteMember.user.tag} لمدة ${muteDuration} دقيقة.`)
                    .setColor('#FFA500');
                
                if (muteReason) muteEmbed.addFields({ name: 'السبب', value: muteReason });
                await interaction.editReply({ embeds: [muteEmbed] });

                setTimeout(async () => {
                    await muteMember.roles.remove(mutedRole);
                    await interaction.channel.send(`تم إلغاء كتم ${muteMember.user.tag}.`);
                }, muteDuration * 60 * 1000);
                break;

            case 'clear':
                const amount = interaction.options.getInteger('amount');
                await interaction.deferReply({ ephemeral: true });
                await interaction.channel.bulkDelete(amount);
                const clearEmbed = new EmbedBuilder()
                    .setTitle('تم مسح الرسائل')
                    .setDescription(`تم مسح ${amount} رسالة.`)
                    .setColor('#0000FF');
                await interaction.editReply({ embeds: [clearEmbed] });
                break;

            case 'warn':
                const warnMember = interaction.options.getMember('member');
                const warnReason = interaction.options.getString('reason');
                const warnEmbed = new EmbedBuilder()
                    .setTitle('تم تحذير العضو')
                    .setDescription(`تم تحذير ${warnMember.user.tag}.`)
                    .setColor('#FFFF00');
                
                if (warnReason) warnEmbed.addFields({ name: 'السبب', value: warnReason });
                await interaction.editReply({ embeds: [warnEmbed] });
                break;

            case 'role':
                const roleMember = interaction.options.getMember('member');
                const role = interaction.options.getRole('role');

                await roleMember.roles.add(role);
                const addRoleEmbed = new EmbedBuilder()
                    .setTitle('تم إضافة الرتبة')
                    .setDescription(`تم إضافة رتبة ${role} إلى ${roleMember.user.tag}`)
                    .setColor('#00FF00');
                await interaction.editReply({ embeds: [addRoleEmbed] });
                break;

            case 'give_role':
                const removeRoleMember = interaction.options.getMember('member');
                const removeRole = interaction.options.getRole('role');

                await removeRoleMember.roles.remove(removeRole);
                const removeRoleEmbed = new EmbedBuilder()
                    .setTitle('تم إزالة الرتبة')
                    .setDescription(`تم إزالة رتبة ${removeRole} من ${removeRoleMember.user.tag}`)
                    .setColor('#0000FF');
                await interaction.editReply({ embeds: [removeRoleEmbed] });
                break;

            case 'users':
                const targetMember = interaction.options.getMember('member') || interaction.member;
                const roles = targetMember.roles.cache
                    .filter(role => role.id !== interaction.guild.id)
                    .map(role => role.toString())
                    .join(' ') || 'لا يوجد';

                const userInfoEmbed = new EmbedBuilder()
                    .setTitle(`معلومات ${targetMember.user.tag}`)
                    .setColor(targetMember.displayHexColor)
                    .setThumbnail(targetMember.user.displayAvatarURL())
                    .addFields(
                        { name: 'الاسم', value: targetMember.user.tag, inline: true },
                        { name: 'الآيدي', value: targetMember.id, inline: true },
                        { name: 'تاريخ الانضمام', value: targetMember.joinedAt.toLocaleDateString(), inline: true },
                        { name: 'تاريخ إنشاء الحساب', value: targetMember.user.createdAt.toLocaleDateString(), inline: true },
                        { name: 'الرتب', value: roles, inline: false }
                    );
                await interaction.editReply({ embeds: [userInfoEmbed] });
                break;

            case 'server':
                const guild = interaction.guild;
                const serverInfoEmbed = new EmbedBuilder()
                    .setTitle(`معلومات سيرفر ${guild.name}`)
                    .setColor('#0000FF')
                    .setThumbnail(guild.iconURL())
                    .addFields(
                        { name: 'عدد الأعضاء', value: guild.memberCount.toString(), inline: true },
                        { name: 'عدد الرتب', value: guild.roles.cache.size.toString(), inline: true },
                        { name: 'عدد القنوات', value: guild.channels.cache.size.toString(), inline: true },
                        { name: 'تاريخ الإنشاء', value: guild.createdAt.toLocaleDateString(), inline: true },
                        { name: 'المالك', value: guild.members.cache.get(guild.ownerId).toString(), inline: true }
                    );
                await interaction.editReply({ embeds: [serverInfoEmbed] });
                break;

            case 'lock':
                await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                    SendMessages: false
                });
                const lockEmbed = new EmbedBuilder()
                    .setTitle('تم قفل القناة')
                    .setDescription(`تم قفل القناة ${interaction.channel}`)
                    .setColor('#FF0000');
                await interaction.editReply({ embeds: [lockEmbed] });
                break;

            case 'unlock':
                await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                    SendMessages: true
                });
                const unlockEmbed = new EmbedBuilder()
                    .setTitle('تم فتح القناة')
                    .setDescription(`تم فتح القناة ${interaction.channel}`)
                    .setColor('#00FF00');
                await interaction.editReply({ embeds: [unlockEmbed] });
                break;

            case 'اعلان':
                const serverName = interaction.options.getString('server_name');
                const title = interaction.options.getString('title');
                const mentionType = interaction.options.getString('mention_type');
                const duration = interaction.options.getInteger('duration');

                const announcementChannel = interaction.guild.channels.cache.get(ANNOUNCEMENT_CHANNEL_ID);
                if (!announcementChannel) {
                    return interaction.editReply({ 
                        content: 'لم يتم العثور على قناة الإعلانات!', 
                        ephemeral: true 
                    });
                }

                const announcementEmbed = new EmbedBuilder()
                    .setTitle(title)
                    .setDescription(`**اسم السيرفر:** ${serverName}\n**مدة الإعلان:** ${duration} أسبوع`)
                    .setColor('#00FF00')
                    .setTimestamp()
                    .setFooter({ text: `تم النشر بواسطة ${interaction.user.tag}` });

                let content = '';
                if (mentionType === '@everyone') {
                    content = '@everyone';
                } else if (mentionType === '@here') {
                    content = '@here';
                }

                await announcementChannel.send({ content, embeds: [announcementEmbed] });
                await interaction.editReply({ 
                    content: 'تم إرسال الإعلان بنجاح!', 
                    ephemeral: true 
                });

                // إزالة الرتبة بعد المدة المحددة
                setTimeout(async () => {
                    try {
                        await member.roles.remove(role);
                        const removeEmbed = new EmbedBuilder()
                            .setTitle('تم إزالة الرتبة المؤقتة')
                            .setDescription(`تم إزالة رتبة ${role} من ${member.user.tag}`)
                            .setColor('#FF0000')
                            .setTimestamp();
                        
                        await interaction.channel.send({ embeds: [removeEmbed] });
                    } catch (error) {
                        console.error('Error removing role:', error);
                    }
                }, duration * 60 * 1000);
                break;

            case 'تحميله':
                const member = interaction.options.getMember('member');

                // التحقق من صلاحيات البوت
                if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
                    await interaction.editReply({
                        content: 'ليس لدي صلاحية تغيير الأسماء!'
                    });
                    return;
                }

                // تغيير اسم العضو
                await member.setNickname('اهه جتني تحميله');
                
                const successEmbed = new EmbedBuilder()
                    .setTitle('تم تحميل العضو')
                    .setDescription(`تم تغيير اسم ${member.user.tag} إلى "اهه جتني تحميله"`)
                    .setColor('#00FF00')
                    .setTimestamp();

                await interaction.editReply({ embeds: [successEmbed] });
                break;
        }
    } catch (error) {
        console.error('Error in command execution:', error);
        try {
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ 
                    content: 'حدث خطأ أثناء تنفيذ الأمر!', 
                    ephemeral: true 
                });
            } else {
                await interaction.editReply({ 
                    content: 'حدث خطأ أثناء تنفيذ الأمر!' 
                });
            }
        } catch (replyError) {
            console.error('Error sending error message:', replyError);
        }
    }
});

client.login(BOT_TOKEN); 

