export function Delay(time) {
    return new Promise((resovel, reject) => {
        setTimeout(() => {
            return resovel(); 	      
        }, time);
    });
}