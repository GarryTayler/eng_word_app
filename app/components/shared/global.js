import { Toast } from 'native-base';
import { _e } from './../../utils/lang';

export function showToast(text = '', type = 'danger', position = 'bottom') {
    Toast.show({
        text: (text == '') ? _e.connectionError : text,
        type: type,
        textStyle: {fontFamily: 'Malgun Gothic', textAlign: 'center'},
        position: position,
        duration: 4000,
    });
}

export function performNetwork(comp, promise) {
    comp.setState({loaded: false});
    return promise.then(response => {
        comp.setState({loaded: true, serverRespond: true});
        if (response.errorCode != 0) {
            showToast(response.errorMsg);
            return;
        }
        return response.data;
    }).catch(err => {
        comp.setState({loaded: true, serverRespond: true});
        showToast();
    });
}