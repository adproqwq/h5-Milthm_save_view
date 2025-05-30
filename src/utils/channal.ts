export class ComponentChannal {
  private broadcastChannal: BroadcastChannel;
  private name: string;

  constructor(name: string){
    this.broadcastChannal = new BroadcastChannel('MilthmSaveReader.component');
    this.name = name;
  };

  send<T>(receiver: string, message: T){
    const sender = this.name;
    this.broadcastChannal.postMessage({ sender, receiver, message });
  };

  listen(callback: (data: { sender: string, receiver:string, message: any }) => void){
    const receiver = this.name;
    this.broadcastChannal.onmessage = ev => {
      if(ev.data.receiver === receiver) callback(ev.data);
    };
  };
};