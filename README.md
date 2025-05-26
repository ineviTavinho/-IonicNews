# Conversor de Moedas Ionic


Um aplicativo móvel híbrido simples para conversão de moedas em tempo real, construído com Ionic e Angular.

## Descrição do Projeto

Este projeto foi desenvolvido como parte de um exercício acadêmico para criar um conversor de moedas funcional e intuitivo. O aplicativo permite aos usuários verificar taxas de câmbio atualizadas, converter valores entre diferentes moedas e visualizar resultados rapidamente. Ele também inclui funcionalidades como cache de taxas para uso offline limitado e um design responsivo.

![Conceito de Câmbio](https://private-us-east-1.manuscdn.com/sessionFile/AHQb94N6Vjs9FgfICtwOmK/sandbox/Po5nsGYsviYunxUB1R1rnJ-images_1748285626232_na1fn_L2hvbWUvdWJ1bnR1L3JlYWRtZV9pbWFnZXMvY3VycmVuY3lfZXhjaGFuZ2VfY29uY2VwdA.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQUhRYjk0TjZWanM5RmdmSUN0d09tSy9zYW5kYm94L1BvNW5zR1lzdmlZdW54VUIxUjFybkotaW1hZ2VzXzE3NDgyODU2MjYyMzJfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwzSmxZV1J0WlY5cGJXRm5aWE12WTNWeWNtVnVZM2xmWlhoamFHRnVaMlZmWTI5dVkyVndkQS5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NjcyMjU2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IWW4uAKfcb2VHV6jV1~7kKER0VdKPrEX~ceAjJUkiBSVfSVCKeWIcky~8bXm0Tci7d-NpxHBlXh34UYCtP3V80FPvOzU9gxJtFyXGk4Lc68HyZ4afIeZZICgV6EoaA05mQ-1zLfIwrLMRzHt5OPaTfc-XChzTZnnP24EdobFme6vA1PeCTko~HDaYbjV3yA-4-ulFeBbyHufHrKAk8c6KEa26ROekNpQefl4yZQSwFM6lux7ppoNn4umiGX4JunPLYy-L5wScLmYnSR85LO0sZaU25dicctyKftzER1qOx-SvZDl9ccxgZgrUyngBJxA2gzIP71B1hTRhFCBYmdzYg__)

**Principais Funcionalidades:**

*   Conversão entre diversas moedas.
*   Busca de taxas de câmbio de uma API externa.
*   Interface de usuário limpa e fácil de usar.
*   Cache de taxas para consulta offline.
*   Histórico de conversões (funcionalidade de backend implementada, interface pendente).

## Como baixar o repositório

Você pode obter o código-fonte deste projeto de duas maneiras:

1.  **Clonando o Repositório (se disponível em Git):**
    ```bash
    git clone https://github.com/ineviTavinho/-IonicNews
    cd <NOME_DO_DIRETORIO>
    ```
2.  **Usando o Arquivo ZIP Fornecido:**
    *   Baixe o arquivo `ionicnewsapp.zip`.
    *   Descompacte o arquivo em um local de sua preferência.
    *   Navegue até o diretório descompactado (`ionicnewsapp`) através do seu terminal.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter o seguinte software instalado em seu sistema:

*   **Node.js e npm:** Essenciais para o ecossistema JavaScript/TypeScript. Recomenda-se a versão LTS mais recente. (Você pode baixar em [nodejs.org](https://nodejs.org/))
*   **Ionic CLI:** A interface de linha de comando do Ionic. Instale globalmente com:
    ```bash
    npm install -g @ionic/cli
    ```
*   **Navegador Web:** Um navegador moderno como Chrome, Firefox ou Edge para visualização.

![Stack Ionic + Angular](https://private-us-east-1.manuscdn.com/sessionFile/AHQb94N6Vjs9FgfICtwOmK/sandbox/Po5nsGYsviYunxUB1R1rnJ-images_1748285626232_na1fn_L2hvbWUvdWJ1bnR1L3JlYWRtZV9pbWFnZXMvaW9uaWNfYW5ndWxhcl9zdGFjaw.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQUhRYjk0TjZWanM5RmdmSUN0d09tSy9zYW5kYm94L1BvNW5zR1lzdmlZdW54VUIxUjFybkotaW1hZ2VzXzE3NDgyODU2MjYyMzJfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwzSmxZV1J0WlY5cGJXRm5aWE12YVc5dWFXTmZZVzVuZFd4aGNsOXpkR0ZqYXcucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzY3MjI1NjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=A3Spk5is3zX~ZvraCxUHpdepAqgtNsYSCKg2JXCFpSolRidSKTtURYTKel6pfuCyD26OZRK03W6FcyFJ4lpFa923~DmPmmzU8-dmZxbllH0Ozf-opV0NNbgEKhI1ckW7-2AOftSHc9YZD~tN549AztuyYfqG1ndBzqKaezVe7hgQ62EG2WzRV-QMnqs-1EaxdNW3dHhlHOJGp1achZzTklqe1nUWz9Y98vjUC4Ytt0SMGIlu7Kt7rqbIoiVYI1KFJfo8SNGNWry4gsKZNkJ8TN8qD56KYTjPimnyCYy6RVoaaPtXSAnKHV-rc~-Oap5RX8son5QZwGwu96NhAWBx9g__)

## Instalação e Execução

Siga estes passos para rodar o aplicativo localmente:

1.  **Navegue até o Diretório:** Abra seu terminal e vá para a pasta raiz do projeto (onde está o `package.json`).
2.  **Instale as Dependências:** Execute o comando para baixar todas as bibliotecas necessárias:
    ```bash
    npm install
    ```
    *Observação: Este passo é necessário apenas na primeira vez ou após atualizações de dependências. Ele recria a pasta `node_modules` que foi excluída do arquivo zip.*
3.  **Execute o Servidor:** Inicie o servidor de desenvolvimento do Ionic:
    ```bash
    ionic serve
    ```
4.  **Acesse:** O aplicativo deve abrir automaticamente em seu navegador em `http://localhost:8100`.

## Funcionalidades Detalhadas

*   **API de Câmbio:** Utiliza a API pública `exchangerate-api.com` (v4) para obter as taxas.
*   **Cache Offline:** As taxas são cacheadas por 1 hora para permitir conversões mesmo sem conexão, usando dados potencialmente desatualizados.
    ![Cache Offline](https://private-us-east-1.manuscdn.com/sessionFile/AHQb94N6Vjs9FgfICtwOmK/sandbox/Po5nsGYsviYunxUB1R1rnJ-images_1748285626232_na1fn_L2hvbWUvdWJ1bnR1L3JlYWRtZV9pbWFnZXMvb2ZmbGluZV9jYWNoZV9jb25jZXB0.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQUhRYjk0TjZWanM5RmdmSUN0d09tSy9zYW5kYm94L1BvNW5zR1lzdmlZdW54VUIxUjFybkotaW1hZ2VzXzE3NDgyODU2MjYyMzJfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwzSmxZV1J0WlY5cGJXRm5aWE12YjJabWJHbHVaVjlqWVdOb1pWOWpiMjVqWlhCMC5wbmciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NjcyMjU2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nIpN~inLrHcJ5FEBCvBqq7gvUv2ASYhQDatdSL1x7pecxx1OkrXdkhSRYWeTAmsoNsGP9p87d1j~KqvXL5bF~g7mu~b5jdqYKVlwEKysnOi9i4T5TEPx9q4N0b7DxomTRtg-z5wU5443qwWQqabnuO2ykaEPQ~got8q55rI4h3u0dElQOHyrj-KkQkJouOWNDFwkKlO1ZBNXMOEfqDG5WbhGgdOBN1z7p7X7tRV-m4~Rsq9xvsugdRZz6jf76oyziziX5On7MShgEDilC-MeRF1Dbf47NnioYnbDQOL~cEYUJsK5BoKK7Nux2B9EavxT0Dc9hBPPGTZa4e1Qaa-eJg__)
*   **Armazenamento:** Usa `@ionic/storage-angular` para salvar o cache e o histórico.

## Contribuindo

Este projeto foi desenvolvido para fins acadêmicos, mas contribuições são bem-vindas caso deseje expandi-lo. Para contribuir:

1.  Faça um Fork do repositório (se aplicável).
2.  Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`).
3.  Faça commit de suas alterações (`git commit -am 'Adiciona NovaFuncionalidade'`).
4.  Faça push para a branch (`git push origin feature/NovaFuncionalidade`).
5.  Abra um Pull Request.

![Contribuição Open Source](https://private-us-east-1.manuscdn.com/sessionFile/AHQb94N6Vjs9FgfICtwOmK/sandbox/Po5nsGYsviYunxUB1R1rnJ-images_1748285626232_na1fn_L2hvbWUvdWJ1bnR1L3JlYWRtZV9pbWFnZXMvY29udHJpYnV0aW9uX2NvbmNlcHQ.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvQUhRYjk0TjZWanM5RmdmSUN0d09tSy9zYW5kYm94L1BvNW5zR1lzdmlZdW54VUIxUjFybkotaW1hZ2VzXzE3NDgyODU2MjYyMzJfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwzSmxZV1J0WlY5cGJXRm5aWE12WTI5dWRISnBZblYwYVc5dVgyTnZibU5sY0hRLnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc2NzIyNTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=EvBj7cKthK91-D~~fhsqPMWexrkoXKs~jTlpUMk1lV-x10wDu0q4AGLHH3TM5m9YQOMJavDYt3RDFjS3IydLqI7zi5iMjezJ2ybiIFvG4qubRBEJI9S1rD7s4K4a0UJiYDhpWZYyRyTsvDlBq6T6XA7aQIer1Cur~0TJ3g7-RLMZ~hgDqgkQQoUBcJ013bzqpJlACvdowE9PT82gHdb1EoLla2u1B1c28WLMFcIWXLvOxGhTxg8ycELqyB-I~IWDo6m1oF8LP5R8Ub2WFF8Eb1ctyzyLTQQcn~IxRL6U~J6DW1cD~2p5AM~GufQPywEB1RoZH4uwQ7GOS8SkKLeqOw__)

## Autores

*   **Desenvolvimento Principal:** Gustavo Andrew Gomes da Silva.

## Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` (se existir) para mais detalhes, ou consulte a [definição da licença MIT](https://opensource.org/licenses/MIT).

