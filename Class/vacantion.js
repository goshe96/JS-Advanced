class Vacation {
    constructor(organizer, destination, budget){
        this.organizer = organizer,
        this.destination = destination,
        this.budget = Number(budget),
        this.kids = {}
    }
    get numberOfChildren() { return Object.values(this.kids).reduce((a, b) => a + b.length, 0) }
 
    budgetIsNotEnought(budget) { return (budget < this.budget) ? true : false };
 
    childrenExist(grade, name) { return this.kids[grade].findIndex(k => k.startsWith(name)) !== -1 ? true : false };
 
    gradeExist(grade) { return this.kids[grade] ? true : false };
 
    indexOfChildren(grade, name) { return this.kids[grade].findIndex(k => k.startsWith(name)) }
    
    registerChild(name,grade,budget){
        if(this.budgetIsNotEnought(budget) === true){ // ako ne mu dostigat parite
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`
        }

        if (this.gradeExist(grade) === true && this.childrenExist(grade, name) === true) {
            return `${name} is already in the list for this ${this.destination} vacation.`
        }

        if (this.gradeExist(grade) === false) {
            this.kids[grade] = [];
        }
        this.kids[grade].push(`${name}-${budget}`)
        return this.kids[grade]
    }

    removeChild(name,grade){
        if(this.childrenExist(grade,name) === false){
            return `We couldn't find ${name} in ${grade} grade.`
        }
        this.kids[grade].splice(this.indexOfChildren(grade,name), 1)
        return this.kids[grade]
    }

    toString() {
        if (this.numberOfChildren === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`
        }
        let result = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;
        Object.entries(this.kids).map(grade => {
            result += `Grade: ${grade[0]}\n`;
            grade[1].map((kid, ind) => result += `${ind + 1}. ${kid}\n`);
        });
 
        return result;
    }


}
let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);
vacation.registerChild('Gosho', 5, 3000);
vacation.registerChild('Lilly', 6, 1500);
vacation.registerChild('Pesho', 7, 4000);
vacation.registerChild('Tanya', 5, 5000);
vacation.registerChild('Mitko', 10, 5500)
console.log(vacation.toString());

