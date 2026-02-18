export function createLoader(buildUrl) {
    return async ({ params }) => {
        try {
            const res = await fetch(buildUrl(params));

            if (!res.ok) {
                const message = res.status === 404
                    ? "Объявление не найдено"
                    : "Ошибка при загрузке объявления";
                throw new Response(message, { status: res.status });
            }

            return res.json();
        } catch (error) {
            if (error instanceof Response) throw error;
            throw new Response(
                "Не удалось загрузить объявление. Проверьте подключение к интернету.",
                { status: 500 }
            );
        }
    };
}