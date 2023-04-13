export interface IntResponse<T> {
    list:T[],
    [key:string]:any

}
export interface IntDataItem {
    date:string,
    interact_cnt:number,
    voice_cnt:number
  }