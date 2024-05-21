## Descrição

Este repositório contém o código fonte de um projeto desenvolvido durante o programa de bolsas da compass uol utilizando React.ts.

Possui responsividade 1440px e 414px.

## Header

- O header não faz interação

## Seção 1

- Input Current location é pré-preenchido com endereço do usuário baseado em IP.

### Validação dos campos:

- Ambos os campos aceitam qualquer coisa, mas não podem estar vazios.
- Se algum campo estiver vazio é dado foco nele.
- O botão find a driver valida os campos e em caso de sucesso direciona para a página 404.

## Seção 2

- Os veículos, textos e links sào obtidos através do backend
- Os links redirecionam para a página da wikipédia correspondente a cada tipo de carro

## Seção 3

- Campos contém validação utilizando zod e react hook form.
- Dados são enviados para o backend.
- Obtem países e cidades a partir de API vinda do backend.
- Exite um loading após selecionar o país.
- Não é possível selecionar cidade antes de do país.
- O botão submit valida os campos e envia os dados para o backend.
- A seção de formulário é modificada para seção de sucesso ao enviar os dados.

## Footer

- Links do footer redirecionam para a página 404.
- Links das redes socias levam para as redes sociais da Compass.

## Página 404

- fundo preto do layout com um ícone de atenção redondo na cor amarela.
