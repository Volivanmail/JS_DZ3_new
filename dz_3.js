const f1 = require("./dz_2_2")

class Good {

    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable (davailable) {
        this.available = davailable;
    }
}


function createGood (){
    goodsArray = [];
    for (let i=0; i<f1.goods.length; i++) {
        const a = new Good (f1.goods[i].id, f1.goods[i].name, f1.goods[i].description, f1.goods[i].sizes, f1.goods[i].price, f1.goods[i].available);
        goodsArray.push(a);
    }

    return goodsArray;
}


class GoodsList {
   #goods
    constructor (goods,filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        const filterGoods = this.#goods.filter((good) => good.available && RegExp(this.filter).test(good.name));
        if (this.sortPrice) {
            if (this.sortDir) {
               const result = filterGoods.sort((good1,good2) => good1.price > good2.price ? 1:-1);
               return result;
            }
            else {
                const result = filterGoods.sort((good1,good2) => good1.price > good2.price ? -1:1);
                return result;
            }
        }    
        return filterGoods;
    }

    add (element) {
        this.#goods.push(element);
        return goodsArray = this.#goods; //это если добавить в исходный массив
    }

    remove(id) {
        goodsArray = this.#goods.filter(item => item.id !==id);
        return goodsArray;

    }
}

class BasketGood extends Good {

    constructor (id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {

    goods = [];

    get totalAmount() {
        let result = this.goods.reduce((sum, good) => {
            return sum + good.price*good.amount
        },0);
        return result;
    }

    get totalSum() {
        let sum = 0;
        this.goods.forEach((good) => {
            return sum += good.amount
        });
        return sum;
    }

    add(good, amount) {

        if (this.goods.length == 0) {
            const addGood = new BasketGood (good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(addGood);
            return addGood;
        }
        else {
            for (let i=0; i<this.goods.length; i++) {
                if (good.id == this.goods[i].id) {
                    this.goods[i].amount += amount;
                    return this.goods[i];           
                }
                else {
                    const addGood = new BasketGood (good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
                    this.goods.push(addGood);
                    return addGood;
                }
            }
        }
    }

    remove(good, amount) {
        if (this.goods.length == 0) {
            console.log('Корзина пустая!');
        }
        else {
            for (let i=0; i<this.goods.length; i++) {
                if (good.id === this.goods[i].id) {
                    this.goods[i].amount -= amount;
                    if (this.goods[i].amount <= 0) {
                            this.goods.splice(i, 1);
                            return this.goods;
                    }
                return this.goods;
                }
            }
        }
    }

    clear() {
        this.goods.length = 0;
        return this.goods;
    }

    removeUnavailable() {
        let result = this.goods.filter(item => item.available !==false);
        this.goods = result;
        return result;
    }
}






createGood();
goodsArray[4].setAvailable(false);

console.log('~~~~~~~~~~~~~~~~~~~~~');

const basketGood1 = new BasketGood (3, 'Носки женские', 'белые', [ '36-39', '40-43' ], 180, true, 10);
const basketGood2 = new BasketGood (2, 'Носки мужские', 'Черные', [ '39-42', '43-46' ], 150, true, 5);
console.log(basketGood1);
console.log(basketGood2);

console.log('______________________');

const goodlist1 = new GoodsList (goodsArray,'Н', true, false);
console.log(goodlist1.list);
const d = new Good (6, 'ffs', 'dfdd', [45], 400, true);
goodlist1.add(d);
console.log('*************************');
console.log(goodsArray);
goodlist1.remove(1);
console.log(goodsArray);

console.log('..........................');

const basket1 = new Basket();

basket1.add(goodsArray[2], 5);
basket1.add(goodsArray[2], 10);
basket1.add(goodsArray[3], 2);
console.log(basket1);

console.log(basket1.totalAmount);
console.log(basket1.totalSum);

console.log('@@@@@@@@@@@@@@@@@@@@@@');
console.log(basket1);
console.log('___________________');
basket1.remove(goodsArray[2], 4);
console.log(basket1);
console.log('$$$$$$$$$$$$$$$$$$$$$');
basket1.remove(goodsArray[3], 1);
console.log(basket1);
basket1.remove(goodsArray[3], 3);
console.log(basket1);

console.log('*************************');
console.log(basket1);
console.log('___________________');
basket1.clear();
console.log(basket1);

console.log('&&&&&&&&&&&&&&&&&&&&&');
basket1.add(goodsArray[4],1);
basket1.add(goodsArray[3],5);
basket1.add(goodsArray[1],110);
console.log(basket1);
console.log('_______________');
basket1.removeUnavailable();
console.log(basket1);
