import { Router } from 'express';
import JwtAuthMiddleware from '../../../middlewares/JwtAuthMiddleware';
import { AssignableRoles } from '../../../entities/Roles';
import PromoCodeServices from '../../../services/promoCode/PromoCodeServices';

const promoCodeRouter = Router();

const promoCodeServices = new PromoCodeServices();

promoCodeRouter.get(
  '/',
  JwtAuthMiddleware(true, [AssignableRoles.ADMIN, AssignableRoles.ADMIN_VIEW]),
  async (req, res) => {
    const response = await promoCodeServices.getAll();

    return res.json({ data: response });
  },
);

export default promoCodeRouter;
