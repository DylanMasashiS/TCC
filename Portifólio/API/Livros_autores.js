// const db = require('../database/connection');

module.exports = {
    async listarLivros_Autores(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT 
                la_cod, autor_cod, livro_cod;`;
            // executa instruções SQL e armazena o resultado na variável usuários
            const livros_autores = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = livros_autores[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista dos Livros e seus Autores.',
                dados: livros_autores[0],
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async cadastrarLivros_Autores(request, response) {
        try {
            // parâmetros recebidos no corpo da requisição
            const {autor_cod, livro_cod} = request.body;
            // instrução SQL
            const sql = `INSERT INTO livros_autores
                (la_cod, autor_cod, livro_cod) 
                VALUES (?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [la_cod, autor_cod, livro_cod];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const la_cod = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de Livros e seus Autores efetuado com sucesso.',
                dados: la_cod
                //mensSql: execSql
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async editarLivros_Autores(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const { autor_cod, livro_cod } = request.body;
            // parâmetro recebido pela URL via params ex: /usuario/1
            const { la_cod } = request.params;
            // instruções SQL
            const sql = `UPDATE livros_autores SET la_cod = ?, usu_cod = ?, 
                        exla_cod = ?, autor_cod = ?, livro_cod = ?, devolvido = ?
                        WHERE la_cod = ?;`;
            // preparo do array com dados que serão atualizados
            const values = [autor_cod, livro_cod, la_cod];
            // execução e obtenção de confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Livro e Autor ${la_cod} atualizado com sucesso!`,
                dados: atualizaDados[0].affectedRows
                // mensSql: atualizaDados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
    async apagarLivros_Autores(request, response) {
        try {
            // parâmetro passado via url na chamada da api pelo front-end
            const { la_cod } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM livros_autores WHERE la_cod = ?`;
            // array com parâmetros da exclusão
            const values = [la_cod];
            // executa instrução no banco de dados
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Livro e Autor ${la_cod} excluído com sucesso`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }    
    }
}