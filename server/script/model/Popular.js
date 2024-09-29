export class Popular {
        constructor(
                id, url, author, name, score, stars,
                votes, price, pricePrevous, portada,
                details, language, lastUpdate
        ) {
                this.id = id;
                this.url = url;
                this.author = author;
                this.name = name;
                this.score = score;
                this.stars = stars;
                this.votes = votes;
                this.price = price;
                this.pricePrevous = pricePrevous;
                this.portada = portada;
                this.details = details;
                this.language = language;
                this.lastUpdate = lastUpdate;
        }
}