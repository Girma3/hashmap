function HashSet(size){
    let table =  new Array(size);
    let itemsInserted = 0;
    const loadFactor = 0.75;
    function getLoadFactor(){
        let occopied = 0;
        for(let place of table){
           if(place !== undefined){
              occopied++;
            }
        }
       return occopied / size
    };
    const resize = () => {
        let newSize = size * 2;
        let newTable = new Array(newSize);
        for(let i = 0; i < table.length; i++){
            
            if(table[i] !== undefined){
              newTable[i] = table[i]
            
            }
        }
    return newTable
    };
    function hash(key){
        let hashcode = 0;
        let primeNum = 31;
        for(let i = 0; i < key.length; i++){
            hashcode += primeNum * hashcode +  key.charCodeAt(i)
        }
        return hashcode % size
    }
   
    function has(key){
       let position = hash(key);
         if(table[position] === key) return true
         else{
            let index = position;
            while(table[index] !== undefined){
                if(table[index] === key) return true
                index = (index + 1) % table.length;
                if(index === position)break;
            }
           
        }
        return false
    }
    function set (key){
        let position = hash(key);
        
        if(has(key) === true)  return 
        //if item exist don't add ignore it
        
        if(getLoadFactor() > loadFactor){
            table = resize();
        }  
       
         
         if(table[position] === undefined){
                table[position] = key;
                itemsInserted++;
              
            }
            else{
                let index = position;
                while(table[index] !== undefined){
                    index = (index + 1) % table.length;
                }
                table[index] = key;
                itemsInserted++;
            }
     };
    function remove(key){
       let position = hash(key);
        if(has(key) === false) return false
        if(table[position] === key){
            table[position] = undefined;
            itemsInserted--;
            return true
        }
        else {
           let index = position;
           while(table[index] !== key){
             index = (index + 1) % table.length
            }
             table[index] = undefined;
             itemsInserted--;
            }
        return true;
    };
    function length(){
        return itemsInserted;  
    };
    function get(key){
        let position = hash(key);
        if(has(key) === false) return null
        if(table[position] === key) return key
        else{
            let index = position
            while(table[index] !== key){
                index = (index + 1) % table.length;
            }
            if(table[index] === key) return key;
        }
    };
    function clear(){
        return table = new Array(size);
    }
    function keys(){
      let occupied = table.filter(place => place !== undefined)
       return occupied
    };
    
    return {
        set , has, remove, length, get , clear, keys
    }
      
};
let sets = HashSet(3)
    sets.set(0);
    sets.set(1);
    sets.set(2);
    sets.set(3);
    sets.remove(2)
    console.log(sets.has(2))
    console.log(sets.length())
    console.log(sets.keys())
   
