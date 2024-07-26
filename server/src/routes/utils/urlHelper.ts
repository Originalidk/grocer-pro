const stringToURL = (url: string) => {
    return url.replace(/[^a-zA-Z0-9\-\.\_\~]/g, (char) => {
        return '%' + char.charCodeAt(0).toString(16);
    });
};

export { stringToURL };