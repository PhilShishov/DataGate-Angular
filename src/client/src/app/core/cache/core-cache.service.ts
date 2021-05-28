import { CacheLocalStorage } from './storage/cache-local-storage';
import { Injectable } from '@angular/core';

import { CacheOptionsInterface } from './interfaces/cache-options.interface';
import { StorageValueInterface } from './interfaces/storage-value.interface';

const CACHE_PREFIX = 'DataGateCache_';

@Injectable(
  { providedIn: 'root' }
)

export class CoreCacheService {

  _storage = new CacheLocalStorage();
  // 4.5 hours in seconds
  private _defaultOptions: CacheOptionsInterface = {
    maxTime: 16200
  };
  private _prefix: string = CACHE_PREFIX;

  /**
   * Set the value of T in cache, should be an array of objects
   * @param value Should be an array of values
   * @returns {boolean}
   * @private Private because we have the control what we have in cache it's in this file
   */
  public set<T>(ctor: { new(): T }, value: any, options?: CacheOptionsInterface): boolean {
    const key = this._getKeyName<T>(ctor);
    return this._set(key, value, options);
  }

  public setByKey(key: string, value: any, options?: CacheOptionsInterface): boolean {
    return this._set(key, value, options);
  }

  private _set(key: string, value: any, options?: CacheOptionsInterface): boolean {
    options = options ? options : this._defaultOptions;
    const storageKey = this._toStorageKey(key);
    if (this._storage.setItem(storageKey, this._toStorageValue(value, options))) {
      return true;
    }
    return false;
  }

  /**
   * Get the value from cache, if not exist we'll go to the server to get values
   * @param ctor
   * @return {An array of values from cache}
   * @public
   */
  public get<T>(ctor: { new(): T }): any {
    const key = this._getKeyName<T>(ctor);
    return this._get(key);
  }

  /**
   * Get the value from cache, if not exist we'll go to the server to get values
   * @param ctor
   * @return {An array of values from cache}
   * @public
   */
  public getByKey(key: string): any {
    return this._get(key);
  }

  public getByKeyValidOrNot(key: string): any {
    const storageValue = this._storage.getItem(this._toStorageKey(key));
    let value: any = null;
    if (storageValue) {
      value = storageValue.value;
    }
    return value;
  }

  private _get(key: string): any {
    const storageValue = this._storage.getItem(this._toStorageKey(key));
    let value: any = null;
    if (storageValue && this._validateStorageValue(storageValue)) {
      value = storageValue.value;
    }
    return value;
  }


  /**
   * Check if the value of T exist in cache
   * @param ctor
   * @return {boolean}
   * @public
   */
  public exist<T>(ctor: { new(): T }): boolean {
    const key = this._getKeyName<T>(ctor);
    const storageValue = this._storage.getItem(this._toStorageKey(key));
    let value: any = null;
    if (storageValue) {
      value = storageValue.value;
    }
    return value !== null;
  }

  /**
   * Remove an item indicated as T from cache
   * @param ctor
   * @public
   */
  public remove<T>(ctor: { new(): T }) {
    const key = this._getKeyName<T>(ctor);
    this._remove(key);
  }

  public removeByKey(key: string) {
    this._remove(key);
  }

  private _remove(key: string) {
    this._storage.removeItem(this._toStorageKey(key));
  }

  /**
   * Remove all items from cache
   * @public
   */
  public removeAll() {
    this._storage.clear();
  }

  /**
   * Prepare value to set to storage
   * @param value
   * @param options
   * @returns {{value: any, options: CacheOptionsInterface}}
   * @private
   */
  private _toStorageValue(value: any, options: CacheOptionsInterface): StorageValueInterface {
    return {
      value: value,
      options: this._toStorageOptions(options)
    };
  }

  /**
   * Prepare options to set to storage
   * @param options
   * @returns {CacheOptionsInterface}
   * @private
   */
  private _toStorageOptions(options: CacheOptionsInterface): CacheOptionsInterface {
    const storageOptions: CacheOptionsInterface = {};
    storageOptions.expires = options.expires ? options.expires :
      (options.maxTime ? Date.now() + (options.maxTime * 1000) : this._defaultOptions.expires);
    storageOptions.maxTime = options.maxTime ? options.maxTime : this._defaultOptions.maxTime;
    return storageOptions;
  }

  /**
   * Validate storage value
   * @param value
   * @returns {boolean}
   * @private
   */
  private _validateStorageValue(value: StorageValueInterface) {
    return value && !!value.options.expires && value.options.expires > Date.now();
  }

  private _toStorageKey(key: string) {
    return this._prefix + key;
  }

  private _getKeyName<T>(ctor: { new(): T }): any {
    return ctor.name === undefined ? ctor.toString() : ctor.name;
  }

}
