import { LinkedList } from "./linked.js";
function HashMap(size){
    
    let table = new Array(size);
    const loadFactor = 0.75;
     let itemsInserted = 0
//function that retrun index 
    function hash(key){
        let hashcode = 0;
        let primeNum = 31;
        for(let i = 0; i < key.length; i++){
            hashcode += primeNum * hashcode +  key.charCodeAt(i)
        }
        return hashcode % size
    }
    function getLoadFactor(){
       let occopied = 0;
      for(let slot of table){
         if(slot !== undefined){
           occopied++;
         }
        }
       return  occopied / size
    }
  
    function set(key, value){
        let position = hash(key);
        let valuePair = function(key, value){
            return{
                key, value
             }
        };
        if(getLoadFactor() > loadFactor ){
            console.log('max reached')
            this.table =  resizeTable();
          }
          //closed addresing using linked list
         if(table[position] === undefined){
            table[position] = new LinkedList();
          }
         table[position].append(valuePair(key, value));
         itemsInserted++;
     }
    function resizeTable(){
        let newSize = size * 2;
        let newTable = new Array(newSize);
        for (let slot of table){
            if(slot !== undefined){
                console.log(slot)
                let key = slot[0];
                let value = slot[1];
                let rePosition = hash(key);
                newTable[rePosition] = [key, value];
            }
        }
     return   newTable
    }
    //function that return value if it's not exist return null
    function get(key){
        let position = hash(key);
        //I use array for result in case we put same key elements in same bucket.
        let result = [];
        if(table[position] !== undefined){
            let current = table[position].heads();
            while(current){
                if(current.value.key === key){
                  result.push(current.value.value)
                }
                current = current.nextNode;
            }
           return result
        }
    };
    function remove(key){
        let position = hash(key);
        let index = 0;
        let isRemoved = false;
        //values is array of with the given key I use array if it has one or more elements with that key
        let values = this.get(key);
        const removeThis = (key) =>{
            if(table[position] !== undefined){
                let current = table[position].heads();
                while(current){
                    if(current.value.key === key){
                       table[position].removeAt(index);
                        if(table[position].size() === 0){
                                table[position] = undefined;
                            }
                    }
                    index++;
                    current = current.nextNode;
                };
            };
            //make index 0 for next item
            index = 0;
        };
            if(values.length !== 0 ){
                for(const keys of values){
                    removeThis(key)
                   isRemoved = true;
                   itemsInserted --;
                }
            }
         return isRemoved
    };
    function has(key){
        let position = hash(key);
        if(table[position] === undefined)return false
        if(table[position] !== undefined){
            if(get(key)){
                return true
            }
            return fasle
        }
    };
    function length(){
        return itemsInserted;
    };
    function clear(){
      return this.table = new Array(size)
    }
    function keys(){
        let allKeys = []
        for(let i = 0; i < table.length; i++){
           
            if(table[i] !== undefined){
                let current = table[i].heads();
                while(current){
                    allKeys.push(current.value.key);
                    current = current.nextNode;
                }
            }
        }
        return allKeys
    };
    function values(){
        let allValues  = [];
        let allKeys = keys();
       for(let i = 0; i < allKeys.length; i++){
          let key = allKeys[i]
          allValues.push(...get(key))
        }
        //in case same key exist get mehtod return twice that item in array
        let unique = [...new Set(allValues) ]
        return unique
    };
    function entries(){
        let allKeys = keys()
        let allValues = values()
        let result = [];
        for (let i = 0; i < allKeys.length; i++){
            let pair = [];
           pair.push(allKeys[i], allValues[i]);
           result.push(pair);
           pair = [];
        }
        return result
    }
    return{
       set, get, remove, has, length, clear, keys, values, entries
    }

};

let hashTable = HashMap(3)

hashTable.set('m', '0');
hashTable.set('w', '1');
hashTable.set('m', '2');
hashTable.set('n', '3');
hashTable.set('o', '4');

console.log(hashTable.get('w'));
console.log(hashTable.get('m'));
console.log(hashTable.remove('m'));
console.log(hashTable.has('m'));
console.log(hashTable.length());
console.log(hashTable.keys());
console.log(hashTable.values());
console.log(hashTable.entries());













   



