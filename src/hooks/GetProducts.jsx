import { useQuery } from "@tanstack/react-query";

const GetProducts = () => {
    const { isError, isLoading, data: products = [], refetch } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_URL}`);
            return response.json();
        }
    });

    return [products, isLoading, isError, refetch];
};

export default GetProducts;
