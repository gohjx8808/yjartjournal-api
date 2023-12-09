import { NextFunction, Response } from 'express';
import { typeAuthenticatedUser } from '../../helpers/sharedHelper';
import { VerifyPromoCodePayload } from '../../services/order/typings';
import PromoCodeServices from '../../services/promoCode/PromoCodeServices';
import { CustomAuthenticatedRequest } from '../../typings';

const VerifyPromoCodeMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<VerifyPromoCodePayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const promoCodeServices = new PromoCodeServices();

      const payload = req.body;
      const user = typeAuthenticatedUser(req);

      const verificationResult = await promoCodeServices.validatePromoCode(
        payload.promoCode,
        user.id,
      );

      if (!verificationResult.success) {
        return res.status(422).json({ message: verificationResult.message });
      }

      next();
    };

export default VerifyPromoCodeMiddleware;
