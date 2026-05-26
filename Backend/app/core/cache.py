import time

cache_store = {}


def get_cache(key):
    item = cache_store.get(key)

    if not item:
        return None

    if time.time() > item["expiry"]:
        del cache_store[key]
        return None

    return item["data"]


def set_cache(key, data, ttl=60):
    cache_store[key] = {
        "data": data,
        "expiry": time.time() + ttl
    }


def clear_cache():
    cache_store.clear()