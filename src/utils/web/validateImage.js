module.exports = async (url) => {
    const data = await fetch(url, { method: "HEAD" });
    if (data.status != 200) return null;

    const types = ["image/png", "image/jpeg", , "image/jpg"];

    const isImage = types.some((type) =>
        data.headers.get("Content-Type").startsWith(type)
    );

    if (isImage) return url;
    else return null;
};
