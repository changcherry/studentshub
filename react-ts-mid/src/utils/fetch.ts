export async function asyncGet(api: string) {
    try {
        const res: Response = await fetch(api)
        try {
            let data = res.json()
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function asyncPost(api: string, body: {} | FormData,key?:string) {
    const res: Response = await fetch(api, {
        method: 'POST',
        headers:new Headers(key?
        {
            'authorization':key,
            'content-Type':"application/json"
        }:
        {
            'content-Type':"application/json"
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function asyncPatch(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'PATCH',
        headers:new Headers({
            'Access-Control-Allow-Origin':"http://localhost:5173/",
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
        mode:"cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.log(error)
    }

}

export async function asyncDelete<T>(api: string, key?: string): Promise<T | Error> {
    const res: Response = await fetch(api, {
        method: 'DELETE',
        headers: new Headers(key
            ? { 'authorization': key }
            : {}
        )
    });
    try {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: T = await res.json(); // 确保解析数据成功
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return new Error('请求失败，请稍后再试。'); // 返回错误对象
    }
}