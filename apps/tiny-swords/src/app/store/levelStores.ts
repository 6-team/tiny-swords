import { writable, Writable, Readable } from 'svelte/store';
import { Observable } from 'rxjs';
import { LayersMap } from '../core/layers/layers.types';

export const storeToObservable = <T>(store: Writable<T> | Readable<T>, initValue: T): Observable<T> => {
  return new Observable((observer) => {
    store.subscribe((value) => {
      observer.next(value ?? initValue);
    });
  });
};

export const boundariesStore = writable<[number, number][]>(null);
export const startCoordsStore = writable<[number, number]>(null);
export const endCoordsStore = writable<[number, number]>(null);
export const mapsStore = writable<LayersMap[]>(null);
