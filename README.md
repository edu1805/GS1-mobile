# 🌱 SOS Natureza

### 👨‍💻 Integrantes:
- Eduardo do NAscimento Barriviera - **RM 555309**
- Thiago Lima de Freitas - **RM 556795**
- Bruno Centurion Fernandes - **RM 556531**

---
## 💡 Solução 
### Sistema web e mobile para denúncia ambiental, permitindo que qualquer pessoa informe problemas como descarte irregular de lixo, queimadas, poluição hídrica, entre outros. A plataforma utiliza localização e dados do usuário para registrar e gerenciar denúncias de forma organizada e acessível.
### O SOS Natureza foi desenvolvido para facilitar a comunicação entre cidadãos e órgãos responsáveis pela preservação ambiental. Ele permite o registro, acompanhamento e visualização em mapa de denúncias ambientais em tempo real.
---
## 🚀 Funcionalidades
### Aplicativo (Mobile com Expo/React Native):
- 📍 Visualização de denúncias em mapa (usando coordenadas reais);

- 📝 Cadastro de novas denúncias com descrição, tipo e localização;

- 👤 Cadastro de novos usuários;

- 📋 Listagem de denúncias por usuário.
---
## Integração de API Backend (.NET 8 com EF Core e Oracle):
### 🔗 Endpoints:
**A API REST em ASP.NET Core expõe os seguintes endpoints:**
- **`POST`**- /api/Denuncia/create: cria uma nova denuncia;
- **`POST`**-  /api/Usuario/create: cria um novo usuario;
- **`GET`**-  /api/Denuncia/usuario/{usuarioId}: pega todas as denuncias feita por um usuario;
- **`DELETE`**-  /api/Denuncia/delete/{id}: deleta uma denuncia pelo id;
- **`GET`**- /api/Denuncia/{id}: pega uma denuncia pelo id;
- **`UPDATE`**- /api/Denuncia/update/{id}: edita a denuncia pelo id;
---
## ▶️ Como rodar o projeto localmente
**📦 Requisitos**
- Docker
- Node.js e Expo CLI instalados
---
## 1. 🐳 Rodando o Backend com Docker
Certifique-se de que o Docker está instalado e rodando.
Execute o seguinte comando para rodar a API usando a imagem publicada no dockerhub:
```bash
docker run -d -p 5000:5000 edu1805/sos-natureza:1.0
```

**2. Clone o repositório**
```bash
git clone https://github.com/edu1805/GS1-mobile.git
cd seu-repositorio
```

**3. Instale as dependências**
```bash
npm install
```
---
### **4. Mude as rotas das operações da API:**
1.
```
http://localhost:5000/api/Denuncia/usuario/${usuarioId}
(ou use o IP público da sua VM, se estiver rodando fora do localhost)
```
> mude no arquivo `app/denuncias` na linha 59 do código
---
2.
```
http://localhost:5000/api/Denuncia/delete/${id}
(ou use o IP público da sua VM, se estiver rodando fora do localhost)
```
> mude no arquivo `app/denuncias` na linha 85 do código
---
3.
```
http://localhost:5000/api/Usuario/create
(ou use o IP público da sua VM, se estiver rodando fora do localhost)
```
> mude no arquivo `app/cadastro` na linha 25 do código
---
4.
```
http://localhost:5000/api/Denuncia/create
(ou use o IP público da sua VM, se estiver rodando fora do localhost)
```
> mude no arquivo `app/novaDenuncia` na linha 28 do código
---
5.
```
http://localhost:5000/api/Denuncia/${id}
(ou use o IP público da sua VM, se estiver rodando fora do localhost)
```
> mude no arquivo `app/editarDenuncia/[id].tsx` na linha 21 do código
---
6.
```
http://localhost:5000/api/Denuncia/update/${id}
(ou use o IP público da sua VM, se estiver rodando fora do localhost)
```
> mude no arquivo `app/editarDenuncia/[id].tsx` na linha 37 do código
---
> ⚠️ **Aviso:** Se estiver usando VM lembre de liberar a posta 5000 como protocolo TCP
---

**5. Inicie o projeto com o Expo**
```bash
npm start
```
> Ou rode `npm run android` para rodar diretamente na versão de android.
