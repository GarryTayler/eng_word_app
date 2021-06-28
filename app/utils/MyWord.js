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
        for(let i = 0; i < myword_id_list.length; i ++)  {
            let _word_detail = await getData('myword_' + myword_id_list[i]);
            myword_list.push(_word_detail);
        }
        return myword_list;
    }
    catch(e) {
        return [];
    }
}