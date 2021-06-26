import { BACKEND_URL } from './constants';

let base_url = BACKEND_URL;
let _headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

function createCall(path, data = null, token = null, headers = {}, method = 'POST') {
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
    if (token) {
        body.api_token = token;
    }
    let strData = JSON.stringify({data: body});

    return fetch(
        `${base_url}${path}`, {
            method,
            headers: merged,
            body: strData,
        },
    ).then((resp) => resp.json());
}