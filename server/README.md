# Proxy de vuelos (Amadeus)

Dos formas de desplegarlo. Ambas necesitan credenciales gratuitas de
https://developers.amadeus.com (Self-Service, plan Test).

## A. Servidor Node propio (Render / Railway / VPS)

    AMADEUS_CLIENT_ID=xxx AMADEUS_CLIENT_SECRET=yyy ALLOWED_ORIGIN=https://tudominio.com \
    node server/flights-server.mjs

Queda escuchando en `http://HOST:8787/api/flights`.

## B. Serverless en Vercel (proyecto aparte, preset "Other")

1. New Project → importa este repo.
2. Root Directory: `server`
3. Framework Preset: Other
4. Environment Variables: AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET, ALLOWED_ORIGIN
5. Deploy → endpoint `https://<proyecto>.vercel.app/api/flights`

## Conectar el sitio

    NEXT_PUBLIC_FLIGHTS_ENDPOINT=https://<endpoint>/api/flights npm run build

Sin esa variable el buscador usa ofertas de demostración.