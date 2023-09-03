const sizeOf = require("image-size");
const axios = require("axios");
const Canvas = require("canvas");
const jimp = require("jimp");

Canvas.registerFont(require("@canvas-fonts/arial-bold"), {
    family: "Arial Bold",
});

class Welcomer {
    constructor({
        background,
        name,
        memberCount,
        avatar,
        layer,
        blur,
        delay,
        frame_limit,
    } = {}) {
        this.background =
            background ||
            "https://i.pinimg.com/originals/ad/9f/8e/ad9f8ef34cbd3567db5df30e484bc00e.png";
        this.name ??= name;
        this.memberCount ??= memberCount;
        this.avatar ??= avatar;
        this.layer = layer || "./src/assets/welcomer/layer.png";
        this.blur ??= blur;
        this.delay = delay || 50;
        this.frame_limit = frame_limit || 30;
    }

    /* Set background of the image (url) */
    setBackground(background) {
        this.background = background;
        return this;
    }

    /* Set user name */
    setName(name) {
        this.name = name;
        return this;
    }

    /* Set memberCount of user */
    setMemberCount(memberCount) {
        this.memberCount = memberCount;
        return this;
    }

    /* Set avatar of the user (url) + png */
    setAvatar(avatar) {
        this.avatar = avatar;
        return this;
    }

    /* Set the blur value if don't then don't use it */
    setBlur(value) {
        this.blur = value;
        return this;
    }

    /* method  to get image size from its url */
    async _getImageSize(url) {
        const data = await axios(url, {
            responseType: "arraybuffer",
        });

        return sizeOf(data.data);
    }

    /* method to render frame */
    async _renderFrame(frame) {
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext("2d");

        const scale = Math.max(
            canvas.width / frame.frameInfo.width,
            canvas.height / frame.frameInfo.height
        );

        const x = canvas.width / 2 - (frame.frameInfo.width / 2) * scale;
        const y = canvas.height / 2 - (frame.frameInfo.height / 2) * scale;

        const layer = await Canvas.loadImage(this.layer);
        let background = await jimp.read(frame.getImage()._obj);

        if (this.blur) background.blur(this.blur);

        background = await background.getBufferAsync("image/png");

        ctx.drawImage(
            await Canvas.loadImage(background),
            x,
            y,
            frame.frameInfo.width * scale,
            frame.frameInfo.height * scale
        );

        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(layer, 0, 0, canvas.width, canvas.height);

        const name =
            this.name.length > 18
                ? this.name.substring(0, 18) + "..."
                : this.name;

        ctx.font = `bold 36px Arial Bold`;
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        ctx.strokeStyle = "#f5f5f5";
        ctx.fillText(`${name}`, 278, 113);

        ctx.strokeText(`${name}`, 278, 113);

        ctx.font = `bold 25px Arial Bold`;
        ctx.fillStyle = "#FFFFFF";

        ctx.fillText(`${this.memberCount}`, 552, 156);

        let avatar = await jimp.read(this.avatar);

        avatar.resize(1024, 1024).circle();
        avatar = await avatar.getBufferAsync("image/png");
        avatar = await Canvas.loadImage(avatar);

        ctx.drawImage(avatar, 72, 48, 150, 150);

        return ctx;
    }

    /* method to generate static image */
    async generate() {
        const img = await this._getImageSize(this.background);

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext("2d");

        const scale = Math.max(
            canvas.width / img.width,
            canvas.height / img.height
        );
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;

        let background = await jimp.read(this.background);
        const layer = await Canvas.loadImage(this.layer);

        if (this.blur) background.blur(this.blur);
        background = await background.getBufferAsync("image/png");

        ctx.drawImage(
            await Canvas.loadImage(background),
            x,
            y,
            img.width * scale,
            img.height * scale
        );

        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(layer, 0, 0, canvas.width, canvas.height);

        const name =
            this.name.length > 12
                ? this.name.substring(0, 12) + "..."
                : this.name;

        ctx.font = `bold 36px Arial Bold`;
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        ctx.strokeStyle = "#f5f5f5";
        ctx.fillText(`${name}`, 278, 113);

        ctx.strokeText(`${name}`, 278, 113);

        ctx.font = `bold 25px Arial Bold`;
        ctx.fillStyle = "#FFFFFF";

        ctx.fillText(`${this.memberCount}`, 552, 156);

        let avatar = await jimp.read(this.avatar);

        avatar.resize(1024, 1024).circle();
        avatar = await avatar.getBufferAsync("image/png");
        avatar = await Canvas.loadImage(avatar);

        ctx.drawImage(avatar, 72, 48, 150, 150);

        return canvas.toBuffer();
    }
}

module.exports = Welcomer;
