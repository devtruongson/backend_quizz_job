import { Request, Response } from 'express';
import User from '~/models/user.model';

export async function createUser(req: Request, res: Response) {
    try {
        
        const { email, password } = req.body;
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required' 
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Invalid email format' 
            });
        }

        const userCheck = await User.findOne({ where: { email } });
        if (userCheck) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Basic password validation (at least 6 characters)
        if (password.length < 6) {
            return res.status(400).json({ 
                error: 'Password must be at least 6 characters long' 
            });
        }

        const user = await User.create(req.body);
        const result = await User.findByPk(user.id, { include: { all: true, nested: true } });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

export async function getUsers(_req: Request, res: Response) {
    
    try {
        const users = await User.findAll({ include: { all: true, nested: true } });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required' 
            });
        }

        const user = await User.findOne({ where: { email, password } });
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
}

export async function registerUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required' 
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Invalid email format' 
            });
        }

        // Basic password validation (at least 6 characters)
        if (password.length < 6) {
            return res.status(400).json({ 
                error: 'Password must be at least 6 characters long' 
            });
        }

        const userCheck = await User.findOne({ where: { email } });
        if (userCheck) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = await User.create({
            email,
            password,
        });
        const result = await User.findByPk(user.id, { include: { all: true, nested: true } });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const user = await User.findByPk(req.params.id, { include: { all: true, nested: true } });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const [updated] = await User.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const user = await User.findByPk(req.params.id, { include: { all: true, nested: true } });
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}
