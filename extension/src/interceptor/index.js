console.log('Hello from interceptor.js!');

if (XMLHttpRequest.prototype.open.toString() !== "function open() { [native code] }") {
  console.log('bug');
}
class Interceptor {
  constructor() {
      const self = this;
      this.subscriptions = [];
      window.XMLHttpRequest.prototype.grabliOpen = window.XMLHttpRequest.prototype.open;
      window.XMLHttpRequest.prototype.open = function (...args){
          const subscribers = this.getSubscribers(...args);
          if(subscribers.length){
              this.addEventListener('load', function(){
                  subscribers.forEach(callback => {
                      if(this.responseType != 'blob'){
                        console.log('Call callback of subscriber');
                          callback(this.responseText)
                      } else {
                          console.log('Got blob',  this.responseType);
                          this.response.text()
                              .then(callback)
                              .catch(error => console.log('Grabli Error: ', error))

                      }
                  })

              }, false) // outdated parametr
          }
          return this.grabliOpen(...args);

      }
  }

  getSubscribers(method, url) {
      return this.subscriptions.reduce((accumulator, element) => {
          const match = element.regExp instanceof RegExp
              ? element.regExp.test(url)
              : element.regExp(url); // but element.regExp not a function
          if (element.method === method && match){
              accumulator.push(element.callback) // why push only callback?
          };
          return accumulator;
      },[])
  }

  subscribe({ regExp, method = 'GET', callback }) {
    this.subscriptions.push({ regExp, callback, method });
  }
}

console.log('Try to intercept URL');
const instance = new Interceptor();

instance.subscribe({
  regExp: new RegExp(`addEventListener`, "g"),
  callback: (data) => {
      console.log(`Subscriber 'addEventListener'`);
      const holder = document.querySelector('add_Event_Listener');
      if (holder) {
        holder.innerText = data;
      } else {
        const el = document.createElement('add_Event_Listener');
        el.innerText = data;
        //el.style.display = 'none';
        document.body.appendChild(el);
    }
  },
   
});

instance.subscribe({
  regExp: new RegExp(`Operators`, "g"),
  callback: (data) => {
    console.log(`Subscriber 'Operators'`);
    const holder = document.querySelector('operators');
    if (holder) {
      holder.innerText = data;
    } else {
      const el = document.createElement('operators');
      el.innerText = data;
      //el.style.display = 'none';
      document.body.appendChild(el);
  }
  }
})

console.log('instance.subscriptions: ', instance.subscriptions);
//console.log('getSubscribers Operatirs', instance.getSubscribers('GET', new RegExp(`Operators`, "g")));