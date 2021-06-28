import { getData, storeData, removeData } from './storageHelper';

export const addToMyWord = async(param) => {
    try {
        let myword_id_list = await getData('myword_list');
        if(myword_id_list == null)
            myword_id_list = [];
        if(myword_id_list.indexOf(param.id) >= 0)
            return true;
        myword_id_list.push(param.id);
        await storeData('myword_list', myword_id_list);
        await storeData('myword_' + param.id, param);
        return true;
    }
    catch(e) {
        return false;
    }
}

export const removeFromMyWord = async(param) => {
    try {
        let myword_id_list = await getData('myword_list');
        if(myword_id_list == null)
            myword_id_list = [];
        let _i = myword_id_list.indexOf(param.id);
        if(_i < 0)
            return true;
        myword_id_list.splice(_i, 1);
        await removeData('myword_' + param.id);
        await storeData('myword_list', myword_id_list);
        return true;
    }
    catch(e) {
        return false;
    }
}

export const getWordListFromMyWord = async() => {
    try {
        let myword_id_list = await getData('myword_list');
        if(myword_id_list == null)
            myword_id_list = [];
        let myword_list = [];
        for(let i = 0; i < myword_id_list.length;)  {
            let _word_detail = await getData('myword_' + myword_id_list[i]);
            
            if(_word_detail == null) {
                myword_id_list.splice(i, 1);
            }
            else {
                myword_list.push(_word_detail);
                i ++;
            }
        }
        await storeData('myword_list', myword_id_list);
        return myword_list;
    }
    catch(e) {
        return [];
    }
}

export const getWordIdListFromMyWord = async() => {
    try {
        let myword_id_list = await getData('myword_list');
        if(myword_id_list == null)
            myword_id_list = [];
        return myword_id_list;
    }
    catch(e) {
        return [];
    }
}