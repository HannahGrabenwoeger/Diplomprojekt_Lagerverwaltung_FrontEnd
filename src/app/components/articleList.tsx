"use client";
import { useEffect, useState } from "react";

// Definiere das Artikel-Interface entsprechend deiner API
interface Article {
    id: number;
    name: string;
    quantity: number;
    location: string;
}

export default function ArticleList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:5100/api/products")
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response:", data); // Debugging
                setArticles(data.$values); // <-- Hier wird das Array extrahiert
            })
            .catch((error) => {
                console.error("Fehler beim Abrufen der Daten:", error);
                setError(error.message);
            });
    }, []);

    return (
        <div>
            <h2 className="flex items-center justify-center  text-lg  font-bold">Article-List</h2>
            {error && <p className="flex items-center justify-center  text-lg  text-red-500">⚠️ {error} ⚠️</p>}
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <strong>{article.name}</strong> - {article.quantity} Pieces (Warehouse: {article.location})
                    </li>
                ))}
            </ul>
        </div>
    );
}
