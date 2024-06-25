import React, { useEffect, useState } from 'react';

const CharacterDetail = ({ id }) => {
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const ts = '1';
            const publicKey = 'fb3467c7d977fddda6cd71cb0518dd66';
            const hash = '7320995791023f22a5e63849175a6567';

            try {
                const response = await fetch(
                    `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const details = await response.json();
                const charDetails = details.data.results[0];
                setCharacter({
                    name: charDetails.name,
                    desc: charDetails.description,
                    comics: charDetails.comics.items.map(item => item.name),
                });
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        };

        getData();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!character) {
        return <div>Loading...</div>;
    }       // polish

    return (
        <div>
            <h1>{character.name} (Details)</h1>
            <h3>Description (If available): </h3><p>{character.desc}</p>
            <h2>Comics</h2>
            <ul>
                {character.comics.map((comic, index) => (
                    <li key={index}>{comic}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetail;
