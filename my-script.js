const request = require("request"), cheerio = require("cheerio");
const arguments = process.argv;

const url = arguments[2]?.split("=")[1];
const words = arguments[3]?.split("=")?.[1]?.split(",");

if(!url) {console.log("No URL provided!"); return;}
if(!words || words.length === 0) {console.log("No words provided"); return;}

const wordJson = {};

request(url, function (error, response, body) {
    if(error) {
        console.log(`Error occurred: ${error}`);
        return;
    }
    var $page = cheerio.load(body),
    text = $page("body").text().toLowerCase();

    for(let i=0; i<words.length; i++) {
        const wd = words[i].toLowerCase();
        while(text.includes(wd)) {
            if(wordJson[wd]) wordJson[wd]++
            else wordJson[wd] = 1
            text = text.replace(wd, "");
        }
    }
    // console.log(wordJson);

    for(word of words) {
        const count = wordJson[word.toLowerCase()] ?? 0;
        console.log(`${word}: ${count}`);
    }
});
