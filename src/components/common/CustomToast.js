import { Toast } from 'native-base';

export const showInternetWarning = () => {
    Toast.show({
        text: 'Cannot connect to the internet',
        buttonText: 'Okay'
    })
}
