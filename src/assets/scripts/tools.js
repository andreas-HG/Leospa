export const shorten = (text, no) => {
    // console.log({text})
    let shortened = text.slice(0, no === 0 ? text.length : no);
    shortened.split("").reverse().indexOf(" ") === 0 &&
        (shortened = shortened.slice(0, -1));
    text.length > no && no !== 0 && (shortened += "...");
    return shortened
};

export const stripMarkup = (text) => {
    return text.replace(/<[^>]*>/g, '')
}