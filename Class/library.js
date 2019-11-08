class Library {
    constructor(libraryName){
        this.libraryName = libraryName;
        this.subscribers = [];
        this.subscribtionType = {
            normal:this.libraryName.length,
            special:this.libraryName.length*2,
            vip: Number.MAX_SAFE_INTEGER
        };
    }

    subscribe(name, type){
        if(!this.subscribtionType[type]){
            throw new Error (`The type ${type} is invalid`)
        }
        const foundSubscriber = this.subscribers.find(s => s.name ===name) // tyrsim v masiva subscribers dali ima obekt s propety s.name koto da e kato "name"

        if(!foundSubscriber){ // ako nqma go syzdavame
            this.subscribers.push({
                name,
                type,
                books: []
            });
        }else {
            foundSubscriber.type = type  // ako go ima promenqme samo type
        }

        return foundSubscriber 
        ? foundSubscriber  // ako go ima vryshtame tova
        : this.subscribers[this.subscribers.length -1]; // ako go nqma vryshtame posledniqt element v masiva
     }

     unsubscribe(name){
        const subscriberIndex = this.subscribers.findIndex(s => s.name ===name) // vzimame index-a na elementa

        if(subscriberIndex === -1){ // ako elementa go nqma , shte vyrne -1 
            throw new Error (`There is no such subscriber as ${name}`) // hvyrlqme greshka
        }

        this.subscribers.splice(subscriberIndex, 1) // ako go ima, go premahvame ot masiva sys funciqta splice
        return this.subscribers; // vryshtame masiva
     }

     receiveBook(subscriberName, bookTitle, bookAuthor){
        const foundSubscriber = this.subscribers.find(s => s.name ===subscriberName)

         if (!foundSubscriber){
             throw new Error (`There is no such subscriber as ${subscriberName}`)
         }

         const subType = foundSubscriber.type;
         const booksCount = this.subscribtionType[subType];
         console.log(booksCount)

         if(foundSubscriber.books.length >= booksCount){
             throw new Error (`You have reached your subscription limit ${subTypeLimit}!`)
         }

         foundSubscriber.books.push(
             {
                 title: bookTitle,
                 author: bookAuthor
             }
         )
         return foundSubscriber;
     }
    
    showInfo(){
        if (!this.subscribers.length){
            return `${this.libraryName} has no information about any subscribers`;
        }

        return this.subscribers
            .map(s => {
                const bookOutput = s.books
                    .map(b => `${b.title} by ${b.author}`)
                    .join(', ')

                    return `Subscriber: ${s.name}, Type: ${s.type}\nReceived books: ${bookOutput}`;
            })
            .join('\n');
    }
}
