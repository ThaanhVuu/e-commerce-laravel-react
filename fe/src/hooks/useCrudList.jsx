import { useEffect, useState } from "react";

export function useCrudList(service, defaultParams = { page: 1, limit: 10 }) {
    const [data, setData] = useState([]);
    const [paging, setPaging] = useState({});
    const [filters, setFilters] = useState(defaultParams);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await service.getAll(filters);
            setData(res.data.data);
            setPaging(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            await loadData();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const refresh = () => loadData();

    const remove = async (id) => {
        let res = await service.remove(id);
        await loadData();
        return res;
    };

    const create = async (payload) => {
        let res = await service.create(payload);
        await loadData();
        return res;
    };

    const update = async (id, payload) => {
        let res = await service.update(id, payload);
        await loadData();
        return res;
    };

    return {
        data, paging, filters, setFilters,
        loading, refresh,
        create, update, remove
    };
}
