import { Router } from 'express';
import { getAllCustomers, createCustomer } from '../controllers/customerController';

const router = Router();

router.get('/', getAllCustomers);
router.post('/', createCustomer);

export default router;
