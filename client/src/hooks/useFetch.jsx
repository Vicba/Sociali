import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetch(url, options = {}) {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            setIsPending(true)

            const data = await axios.post(url, options)

            setIsPending(false)
            setData(data)
        }

        fetchData()

    }, [url])

    return { data, isPending };
}
