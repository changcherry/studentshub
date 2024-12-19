/**
 * 異步呼叫api, 只可用響應體為 json 的 api
 * @param api 要呼叫的api
 * @returns json 結果
 */
export async function asyncPost(api: string, body: {} | FormData) {
    try {
        const res: Response = await fetch(api, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': "application/json"
            }),
            body: body instanceof FormData ? body : JSON.stringify(body),
            mode: "cors"
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            return { success: false, message: error.message };
        } else {
            console.error("Unexpected error:", error);
            return { success: false, message: "Unexpected error occurred." };
        }
    }
}

