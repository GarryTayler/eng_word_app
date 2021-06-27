import { BACKEND_URL } from './constants';

let base_url = BACKEND_URL;
let _headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

function createCall(path, data = null, headers = {}, method = 'POST') {
    const merged = {
        ..._headers,
        ...headers,
    };

    let body = {};
    if (data) {
        body = {
            ...body,
            ...data,
        };
    }
    let strData = JSON.stringify(body);

    return fetch(
        `${base_url}${path}`, {
            method,
            headers: merged,
            body: strData,
        },
    ).then((resp) => resp.json());
}

export function getCategoryList(parent_id) {
    return createCall(
        'category/get-category-list',
        {parent_id},
    );
}

export function getVideoList (category_id) {
    return createCall(
        'category/get-video-list',
        {category_id}
    );
}