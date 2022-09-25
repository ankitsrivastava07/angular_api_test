import { Inject, Injectable } from "@angular/core";

export class RequestDto {

    constructor(public uri: string, public methodType : string, public requestBody : any){}

}
