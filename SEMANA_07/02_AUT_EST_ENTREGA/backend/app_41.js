const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'curriculo-ponderada.sqlite';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("../frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read) - TABELA USUARIO
app.get('/usuarios', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM tblUsuario ORDER BY NOME_USUARIO COLLATE NOCASE';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Retorna todos registros (é o R do CRUD - Read) - TABELA FORMAÇÕES
app.get('/formacoes', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM tblFormacoes ORDER BY NOME_FORMACOES COLLATE NOCASE';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Retorna todos registros (é o R do CRUD - Read) - TABELA EXPERIENCIAS
app.get('/experiencias', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM tblExperiencias ORDER BY NOME_EXPERIENCIAS COLLATE NOCASE';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Retorna todos registros (é o R do CRUD - Read) - TABELA HABILIDADES
app.get('/habilidades', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM tblHabilidades ORDER BY NOME_HABILIDADES COLLATE NOCASE';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Retorna todos registros (é o R do CRUD - Read) - TABELA SOBRE MIM
app.get('/sobremim', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM tblSobreMim ORDER BY TELEFONE_USUARIO COLLATE NOCASE';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Retorna todos registros (é o R do CRUD - Read) - TABELA REALIZAÇÕES
app.get('/realizacoes', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM tblRealizacoes ORDER BY NOME_REALIZACOES COLLATE NOCASE';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

app.post('/realizacoes', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = "INSERT INTO tblRealizacoes (NOME_REALIZACOES, ID_USUARIO) VALUES ('" + req.body.nome + "', '1')";
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>REALIZACAO INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO tblUsuario (NOME_USUARIO, CARGO_USUARIO) VALUES ('" + req.body.nome + "', '" + req.body.cargo + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

app.post('/insereFormacoes', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = "INSERT INTO tblFormacoes (NOME_FORMACOES, INSTITUICAO_FORMACOES, PERIODO_FORMACOES, DESCRICAO_FORMACOES) VALUES ('" + req.body.nome + "', '" + req.body.instituicao + "'" + req.body.periodo + "'," + req.body.descricao + "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>FORMACAO INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaUsuario', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM tblUsuario WHERE ID_USUARIO="+ req.query.userId;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});


// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE tblUsuario SET NOME_USUARIO='" + req.body.nome + "', CARGO_USUARIO = '" + req.body.cargo +  "' WHERE ID_USUARIO='" + req.body.userId + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM tblUsuario WHERE ID_USUARIO='" + req.query.userId + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});