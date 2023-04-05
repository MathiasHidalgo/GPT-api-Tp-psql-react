import { Pool } from 'pg';
import { Request, Response } from 'express';

const pool = new Pool({
  user: 'mathbucks',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

export const getUsers = (request: Request, response: Response): void => {
  
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
     //pool.end(); // Remember to close the pool when you're done using it
    });
  };

export const getUserById = (request: Request, response: Response): void => {
    const id: number = parseInt(request.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
      //pool.end(); // Remember to close the pool when you're done using it
    });
  };
  
export const createUser = (request: Request, response: Response): void => {
    const { name, email } = request.body;
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    });
  };
  
export const updateUser = (request: Request, response: Response): void => {
    const id: number = parseInt(request.params.id);
    const { name, email } = request.body;
  
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
      }
    );
  };

export const deleteUser = (request: Request, response: Response): void => {
    const id: number = parseInt(request.params.id);
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    });
  };

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
