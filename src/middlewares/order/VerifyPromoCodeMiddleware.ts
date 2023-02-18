import { NextFunction, Response } from 'express';
import { orderRepository } from '../../dataSource';
import { Users } from '../../entities/Users';
import { getAddressList } from '../../services/address/addressServices';
import { getPromoCodeByName } from '../../services/order/orderServices';
import { VerifyPromoCodePayload } from '../../services/order/typings';
import { CustomAuthenticatedRequest } from '../../typings';

const VerifyPromoCodeMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<VerifyPromoCodePayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;
      const user = req.user.valueOf() as Users;

      const existingPromoCode = await getPromoCodeByName(payload.promoCode);

      if (!existingPromoCode) {
        return res.status(422).json({ message: 'Invalid promo code.' });
      }

      const currentDate = new Date();

      if (currentDate < existingPromoCode.startedAt) {
        return res.status(422).json({ message: 'Promo is not started.' });
      }

      if (currentDate > existingPromoCode.expiredAt) {
        return res.status(422).json({ message: 'Promo expired.' });
      }

      const userAddresses = await getAddressList(user);
      let promoCodeUsedAmount = 0;
      userAddresses.map(async (address) => {
        const addressPromoCode = await orderRepository.findBy({
          address: address,
          promoCodeUsed: existingPromoCode,
        });

        promoCodeUsedAmount += addressPromoCode.length;
      });

      if (promoCodeUsedAmount > existingPromoCode.useLimit) {
        return res.status(422).json({ message: 'Promo limit exceeded.' });
      }

      next();
    };

export default VerifyPromoCodeMiddleware;
