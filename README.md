# E-commerce V3

## 🛠️ DÉVELOPPEMENT EN LOCAL

### CLIENT

1. **Démarrer l'appication** :
   ```bash
   cd <client>
   npm run dev
   ```

### API

1. **Lancer l'émulateur de firebase** :
   ```bash
   cd <api/functions>
   npm run serve (firebase emulators:start --only functions)
   functions: Emulator started at http://127.0.0.1:5001/noralyapreprod/us-central1/api
   ```
2. **Interface de l'émulateur firebase** :

   ```bash
   http://127.0.0.1:4000/logs?q=metadata.emulator.name%3D%22functions%22

   ```

3. **Utilser cette adresse comme api** :
   ```bash
   cd <client>
   VITE_API_URL =http://127.0.0.1:5001/noralyapreprod/us-central1/api/api
   ```
   ⚠️ api/api

## 🚀 APPLICATION DEPLOY

### Preproduction

| **Côté**       | **Commandes**                                                          |
| -------------- | ---------------------------------------------------------------------- |
| **Front side** | 1. `cd client`                                                         |
|                | 2. `npm run build:preprod`                                             |
|                | 3. `firebase deploy --project preprod` ou simplement `firebase deploy` |
| **Back side**  | 1. `cd api/functions`                                                  |
|                | 2. `npm run deploy`                                                    |
|                | 3. `firebase deploy --project preprod` ou simplement `firebase deploy` |

### Production

| **Côté**       | **Commandes**                             |
| -------------- | ----------------------------------------- |
| **Front side** | 1. `cd client`                            |
|                | 2. `npm run build:production`             |
|                | 3. `firebase deploy --project production` |
| **Back side**  | 1. `cd api/functions`                     |
|                | 2. `npm run deploy:production`            |
|                | 3. `firebase deploy --project production` |

---

## 🌐 APPLICATION ADDRESSES

### Preproduction

- **Front side:** [noralyapreprod.web.app](https://noralyapreprod.web.app/)
- **Back side:** [API Endpoint](https://api-zcaf44vszq-uc.a.run.app/api)
