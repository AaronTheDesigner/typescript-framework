import axios, { AxiosPromise } from "axios";

// code here refers to properties in a different class

interface HasId {
    id?: number;
}

export class Sync<T extends HasId> {

    constructor(public rootUrl: string) {} 

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`);
    }

    save( data: T ): AxiosPromise {
        const { id } = data;

        if (id) {
            return axios.put(`${this.rootUrl}/${id}`, data);
        } else {
            return axios.post('${this.rootUrl}', data)
        }
    }
}