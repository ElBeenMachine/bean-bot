const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");
const WelcomeImage = require("../../models/WelcomeImage");
const validateImage = require("../../utils/web/validateImage");
const Embed = require("../../structures/Embed");

module.exports = {
    name: "welcome-set-image",
    description: "Set a custom welcome message background image",
    devOnly: false,
    testOnly: false,
    deleted: false,
    options: [
        {
            name: "url",
            description: "The URL of the image that you would like.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.ManageGuild],
    botPermissions: [],
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            throw new Error("This command can only be run inside of a server");
        }

        const url = interaction.options.get("url").value;

        if ((await validateImage(url)) === null) {
            throw new Error(
                "Please enter a URL that corresponds to an image either in JPEG or PNG format."
            );
        }

        let welcomeImage = await WelcomeImage.findOne({
            guildID: interaction.guild.id,
        });

        if (welcomeImage) {
            if (welcomeImage.imageURL === url) {
                throw new Error(
                    "A custom welcome message background has already been set. To revert back to the default, run `/welcome-remove-image`"
                );
            }

            welcomeImage.imageURL = url;
        } else {
            welcomeImage = new WelcomeImage({
                guildID: interaction.guild.id,
                imageURL: url,
            });
        }

        await welcomeImage.save();

        const successEmbed = new Embed(client, {
            title: "Success",
            description: `Welcome background has been set to the following image. To revert back to the default, run \`/welcome-remove-image\``,
            color: 0xfff900,
        });

        successEmbed.setImage(url);

        await interaction.editReply({ embeds: [successEmbed] });
    },
};
