enum CacheType {
  Local,
  Session
}

class CacheStorage {
  storage: Storage

  constructor(storage: CacheType) {
    this.storage = storage === CacheType.Local ? localStorage : sessionStorage
  }

  // storage中保存的键值对类型均为字符串 因此面对对象 我们需要先将其转换为字符串再保存
  setCache(key: string, value: any) {
    // 还有保存时需要注意 如果你要保存的是false这种不成立的条件判断时 你需要做的是将条件判断改进的更加严谨 将不成立的条件缩小至undefined
    if (value !== undefined) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) return JSON.parse(value)
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clearCache() {
    this.storage.clear()
  }
}

export const localCache = new CacheStorage(CacheType.Local)
