const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoDbUrl = 'mongodb://127.0.0.1:27017';
const url = 'http://localhost:3000';

describe('1 - Crie um endpoint para o cadastro de usuários', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('RomanCalculator');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    const users = {
      email: 'root@email.com', password: 'admin'
    };
    await db.collection('users').insertOne(users);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que o campo "email" é obrigatório', async () => {
    await frisby
      .post(`${url}/user/`,
        {
          password: '12345678',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email and Password are mandatory!');
      });
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    await frisby
      .post(`${url}/user/`,
        {
          email: 'erickjaquin@gmail.com',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email and Password are mandatory!');
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo email inválido', async () => {
    await frisby
      .post(`${url}/user/`,
        {
          email: 'erickjaquin',
          password: '12345678',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Incorrect Email');
      });
  });

  it('Será validado que o campo "email" é único', async () => {
    await frisby
      .post(`${url}/user/`,
        {
          email: 'erickjaquin@gmail.com',
          password: '12345678',
        })
      .expect('status', 201);

    await frisby
      .post(`${url}/user/`,
        {
          email: 'erickjaquin@gmail.com',
          password: '12345678',
        })
      .expect('status', 409)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email already registered');
      });
  });

  it('Será validado que é possível cadastrar usuário com sucesso', async () => {
    await frisby
      .post(`${url}/user/`,
        {
          email: 'erickjaquin@gmail.com',
          password: '12345678',
        })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('User created successfully!');
        expect(result.user.email).toBe('erickjaquin@gmail.com');
      });
  });

});

describe('2 - Crie um endpoint para o login de usuários', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('RomanCalculator');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    const users = {
      email: 'root@email.com', password: 'admin'
    };
    await db.collection('users').insertOne(users);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que o campo "email" é obrigatório', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          password: '12345678',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email and Password are mandatory!');
      });
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          email: 'erickjaquin@gmail.com',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email and Password are mandatory!');
      });
  });

  it('Será validado que não é possível fazer login com um email inválido', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'erickjaquin3.com',
          password: '12345678',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Incorrect Email');
      });
  });

  it('Será validado que não é possível fazer login com uma senha incorreta', async () => {
    await frisby
      .post(`${url}/user/`,
        {
          email: 'erickjacquin@gmail.com',
          password: '12345678',
        })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .post(`${url}/login`,
            {
              email: result.user.email,
              password: '123456',
            })
          .expect('status', 403)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.message).toBe('Incorrect Email or Password');
          });
      });
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    await frisby
      .post(`${url}/user/`,
        {
          email: 'erickjacquin@gmail.com',
          password: '12345678',
        })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .post(`${url}/login`,
            {
              email: result.user.email,
              password: '12345678',
            })
          .expect('status', 200)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.token).not.toBeNull();
          });
      });
  });
});

describe('3 - Crie um endpoint para realizer o cálculo', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('RomanCalculator');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    const users = {
      email: 'root@email.com', password: 'admin'
    };
    await db.collection('users').insertOne(users);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que não é possível calcular sem o campo "numbersToSum"', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'root@email.com',
        password: 'admin',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/calculator`, {
            numbersToSub: ['V', 'IV'],
          })
          .expect('status', 400)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.message).toBe('Both Arrays are mandatory!');
          });
      });
  });

  it('Será validado que não é possível calcular sem o campo "numbersToSub"', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'root@email.com',
        password: 'admin',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/calculator`, {
            numbersToSum: ['V', 'IV'],
          })
          .expect('status', 400)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.message).toBe('Both Arrays are mandatory!');
          });
      });
  });

  it('Será validado que não é possível cadastrar sem informar o token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/calculator`, {
        numbersToSub: ['V', 'IV'],
        numbersToSum: ['V', 'IV'],
      })
      .expect('status', 401)
      .then((responseLogin) => {
        const { json } = responseLogin;
        expect(json.message).toBe('missing auth token');
      });
  });

  it('Será validado que não é possível cadastrar uma receita com token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '6437658488',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/calculator`, {
        numbersToSub: ['V', 'IV'],
        numbersToSum: ['V', 'IV'],
      })
      .expect('status', 401)
      .then((responseLogin) => {
        const { json } = responseLogin;
        expect(json.message).toBe('jwt malformed');
      });
  });

  it('Será validado que é o calculo é feito corretamente', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'root@email.com',
        password: 'admin',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/calculator`, {
            numbersToSum: ['V', 'IV'],
            numbersToSub: ['V', 'IV'],
          })
          .expect('status', 200)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.numbersSum).toBe("V + IV = IX");
            expect(json.numbersSubtraction).toBe("V - IV = I");
          });
      });
  });
});