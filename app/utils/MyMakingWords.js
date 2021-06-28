import { getData, storeData, removeData } from './storageHelper';
/*
- vocabulary_count: 0
- vocabulary_list: [
    {id: 1, name: ''},
    {id: 2, name: ''}
]
- vocabulary_data_id
[
    {
        no:1, word:'', meaning: '', order: 1 //2
    }
]
*/

export const getVocabularyList = async() => {
    try {
        let v_id_list = await getData('vocabulary_list');
        if(v_id_list == null)
            v_id_list = [];
        return v_id_list;
    }
    catch(e) {
        return [];
    }
}

export const saveVocabulary = async(prev_data, data) => {
    try {
        await storeData('vocabulary_list', data);
        for(let i = 0; i < prev_data.length; i ++) {
            let flag = false;
            for(let j = 0; j < data.length; j ++) {
                if(prev_data[i]['id'] == data[j]['id']) {
                    flag = true;
                    break;
                }
            }
            if(!flag) {
                await removeData('vocabulary_data_' + prev_data[i]['id']);
            }
        }
        return true;
    }
    catch(e) {
        return false;
    }
}

export const 