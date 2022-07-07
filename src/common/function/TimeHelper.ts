export class TimeHelper {
  //TODO
  getNow() {
    const mydate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Jakarta',
    });
    const date = new Date(mydate);
    console.log(mydate);
    console.log(date);
    return date;
  }
  addMinus(date: Date, minus: number) {
    return date.setTime(date.getTime() + minus * 60 * 1000);
  }
}
