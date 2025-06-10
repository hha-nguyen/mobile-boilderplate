export function normalizeResponse<T = any>(response: any): T {
    if (!response) return response;

    if (Array.isArray(response)) {
        return response as unknown as T;
    }

    if (typeof response === 'object') {
        if (response.data !== undefined) {
            if (!response.error || response.status === 200) {
                if (response.data) {
                    return response.data as unknown as T;
                }

                if (
                    response.data.data
                ) {
                    return response.data.data as unknown as T;
                }

                return response.data as unknown as T;
            }
            throw {
                message: response.message || 'Server error',
                status: response.status,
                data: response.data,
            };
        } else {
            return response as unknown as T;
        }
    }

    return response as unknown as T;
}
