import { NextFunction, Response } from 'express';
import { typeAuthenticatedUser } from '../../helpers/sharedHelper';
import { getPromoCodeByName } from '../../repositories/promoCodeRepository';
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

      const existingPromoCode = await getPromoCodeByName(payload.promoCode);

      const verificationResult = await promoCodeServices.validatePromoCode(
        existingPromoCode,
        user.id,
      );

      if (!verificationResult.success) {
        return res.status(422).json({ message: verificationResult.message });
      }

      next();
    };

export default VerifyPromoCodeMiddleware;
