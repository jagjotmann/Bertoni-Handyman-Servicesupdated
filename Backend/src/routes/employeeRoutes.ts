import express from 'express';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController';

const router = express.Router();

router.get('/', getEmployees);
router.post('/', addEmployee);
router.put('/:email', updateEmployee);
router.delete('/:email', deleteEmployee);

export default router;