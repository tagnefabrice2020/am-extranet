import { useEffect } from "react";

export const useTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title
        document.title = 'Amexpert - Extranet | ' + title
        return () => {
            document.title = 'Amexpert - Extranet | ' + prevTitle
        }
    });
}
